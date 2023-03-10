import { type SavedTweet } from "@prisma/client";
import { useState } from "react";
import { AnimatedPage } from "../../components/AnimatedPage";
import { LoginModal } from "../../components/LoginModal";
import { LoadingTweets, Tweet } from "../../components/Tweets";
import { api } from "../../utils/api";
import SavedTweetsLayout from "../../lib/layouts/SavedTweetsLayout";

export default function SavedTweetsPage() {
  const [showModal, setShowModal] = useState(false);
  const { data, isFetching, isLoading, isError } =
    api.tweets.getSavedTweets.useQuery(undefined, {
      refetchOnWindowFocus: false,
      onError: () => {
        setShowModal(true);
      },
    });

  if (isError) {
    return (
      <div className="h-8/12 mt-12 flex flex-col items-center text-3xl text-white">
        Something went wrong
        <LoginModal
          open={showModal}
          close={() => setShowModal(false)}
        ></LoginModal>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="h-8/12 mt-20 flex flex-col items-center text-3xl text-white">
        You don&#39;t have any saved tweets yet
      </div>
    );
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

const SavedTweets: React.FC<{ tweets: SavedTweet[] }> = ({ tweets }) => {
  return (
    <div className="mt-10 flex w-[80%] flex-col">
      {tweets.map(({ tweet, id }) => (
        <Tweet key={id} tweet={tweet} saved id={id}></Tweet>
      ))}
    </div>
  );
};

SavedTweetsPage.getLayout = (page: React.ReactElement) => {
  return <SavedTweetsLayout>{page}</SavedTweetsLayout>;
};
