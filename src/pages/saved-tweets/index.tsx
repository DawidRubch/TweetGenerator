import { SavedTweet } from "@prisma/client";
import { LoadingTweets, SavedTweets } from "../../components/Tweets";
import { api } from "../../utils/api";

export default function () {
  const { data, isLoading, isError } = api.tweets.getSavedTweets.useQuery();

  console.log(data, isLoading, isError);

  if (isError) {
    return <div>Something got fucked </div>;
  }

  return (
    <main className="mt-12 flex flex-col items-center">
      <h1 className=" ml-[10%]  self-start text-3xl font-bold text-white">
        Saved Tweets
      </h1>

      {isLoading ? (
        <LoadingTweets count={10}></LoadingTweets>
      ) : (
        <SavedTweets tweets={data as SavedTweet[]}></SavedTweets>
      )}
    </main>
  );
}
