import { SavedTweet as SavedTweetSchema } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { useSavedTweets } from "../hooks/useSavedTweets";
import { Heart } from "./Heart";

export const SavedTweets: React.FC<{ tweets: SavedTweetSchema[] }> = ({
  tweets,
}) => {
  return (
    <div className="mt-10 flex w-[80%] flex-col">
      {tweets.map(({ tweet, id }) => (
        <Tweet tweet={tweet} saved id={id}></Tweet>
      ))}
    </div>
  );
};

export const Tweets: React.FC<{ tweets: string[] }> = ({ tweets }) => {
  return (
    <div className="mt-10 flex w-[80%] flex-col">
      {tweets.map((tweet) => (
        <Tweet tweet={tweet}></Tweet>
      ))}
    </div>
  );
};

export const LoadingTweets: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="mt-10 flex w-[80%] flex-col">
      {Array.from(Array(count).keys()).map(() => (
        <LoadingTweet />
      ))}
    </div>
  );
};

export const LoadingTweet = () => (
  <TweetSkeleton animate={true}>
    <div className="h-[20px] w-9/12 rounded-full bg-white opacity-40"></div>
  </TweetSkeleton>
);

export const Tweet: React.FC<{
  tweet: string;
  saved?: boolean;
  id?: string;
}> = ({ tweet, saved, id }) => {
  const { unsaveTweet, saveTweet } = useSavedTweets();
  const [localSaved, setLocalSaved] = useState(saved);
  const [isSaving, setIsSaving] = useState(false);
  const [tweetId, setTweetId] = useState(id);

  const handleSave = async () => {
    setLocalSaved(true);
    try {
      const schema = await saveTweet(tweet);
      setTweetId(schema?.id);
    } catch (e) {
      setLocalSaved(false);
      throw e;
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnsave = async () => {
    setIsSaving(true);
    if (!tweetId) return;
    try {
      await unsaveTweet({ id: tweetId });
      setLocalSaved(false);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSave = () => {
    setIsSaving(true);
    if (localSaved) {
      handleUnsave();
    } else {
      handleSave();
    }
  };

  const buttonClassName = clsx(
    "ml-auto mr-5",
    isSaving && "animate-bounce opacity-50"
  );

  return (
    <TweetSkeleton>
      {tweet}
      <button
        disabled={isSaving}
        className={buttonClassName}
        onClick={toggleSave}
      >
        {<Heart full={localSaved} />}
      </button>
    </TweetSkeleton>
  );
};

const TweetSkeleton: React.FC<{
  animate?: boolean;
  children?: React.ReactNode;
}> = ({ animate, children }) => {
  const className = clsx(
    "mt-5  rounded-xl bg-white bg-opacity-20 p-10 text-white flex",
    animate && "animate-pulse"
  );

  return <div className={className}>{children}</div>;
};
