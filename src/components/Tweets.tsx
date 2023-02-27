import clsx from "clsx";
import { useState } from "react";
import { useSavedTweets } from "../hooks/useSavedTweets";
import { Heart } from "../icons/Heart";


export const LoadingTweets: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="mt-10 flex w-[80%] flex-col">
      {Array.from(Array(count).keys()).map((val) => (
        <LoadingTweet key={val} />
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
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnsave = async () => {
    setLocalSaved(false);
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
      handleUnsave().catch((e) => {
        console.error(e);
      });
    } else {
      handleSave().catch((e) => {
        console.error(e);
      });
    }
  };

  return (
    <TweetSkeleton>
      <span> {tweet}</span>
      <button
        disabled={isSaving}
        className="ml-auto mr-5 max-sm:mr-1 "
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
    "mt-5  rounded-xl bg-white bg-opacity-20 p-10 text-white flex max-sm:p-5 max-sm:px-3 max-sm:text-sm flex items-center",
    animate && "animate-pulse"
  );

  return <div className={className}>{children}</div>;
};
