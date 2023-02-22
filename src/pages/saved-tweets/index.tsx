import { SavedTweet } from "@prisma/client";
import { AnimatedPage } from "../../components/AnimatedPage";
import { LoadingTweets, SavedTweets } from "../../components/Tweets";
import { api } from "../../utils/api";

export default function () {
  const { data, isFetching, isLoading, isError } =
    api.tweets.getSavedTweets.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  if (isError) {
    return <div>Something got fucked </div>;
  }

  return (
    <AnimatedPage className="mt-12 flex flex-col items-center">
      <h1 className=" ml-[10%] self-start text-3xl font-bold text-white">
        Saved Tweets
      </h1>

      {isFetching || isLoading ? (
        <LoadingTweets count={data?.length || 10}></LoadingTweets>
      ) : (
        <SavedTweets tweets={data as SavedTweet[]}></SavedTweets>
      )}
    </AnimatedPage>
  );
}
