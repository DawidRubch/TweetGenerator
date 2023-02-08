import { SavedTweet } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { api } from "../utils/api";

export const SavedTweets: React.FC<{ tweets: SavedTweet[] }> = ({ tweets }) => {
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
  const queryClient = useQueryClient();
  const { mutate: saveTweet } = api.tweets.saveTweet.useMutation({
    onSuccess: () => {
      const query = api.tweets.getSavedTweets.getQueryKey();

      queryClient.invalidateQueries(query);
    },
  });
  const { mutate: unsaveTweet } = api.tweets.unsaveTweet.useMutation({
    onSuccess: () => {
      const query = api.tweets.getSavedTweets.getQueryKey();

      queryClient.invalidateQueries(query);
    },
  });

  const toggleSave = () => {
    if (saved && id) {
      unsaveTweet({ id });
    } else {
      saveTweet(tweet);
    }
  };

  return (
    <TweetSkeleton>
      {tweet}
      <button onClick={toggleSave}>Heart</button>
    </TweetSkeleton>
  );
};

const TweetSkeleton: React.FC<{
  animate?: boolean;
  children?: React.ReactNode;
}> = ({ animate, children }) => {
  const className = clsx(
    "mt-5  rounded-xl bg-white bg-opacity-20 p-10 text-white",
    animate && "animate-pulse"
  );

  return <div className={className}>{children}</div>;
};
