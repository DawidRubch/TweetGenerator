import { SavedTweet } from "@prisma/client";
import { useState } from "react";
import { AnimatedPage } from "../../components/AnimatedPage";
import { LoginModal } from "../../components/LoginModal";
import { LoadingTweets, SavedTweets } from "../../components/Tweets";
import { api } from "../../utils/api";
import SavedTweetsLayout from "./layout";

export default function SavedTweetsPage() {
  const [showModal, setShowModal] = useState(false);
  const { data, isFetching, isLoading, isError } =
    api.tweets.getSavedTweets.useQuery(undefined, {
      refetchOnWindowFocus: false,
      onError: (e) => {
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
        You don't have any saved tweets yet
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

SavedTweetsPage.getLayout = (page: React.ReactElement) => {
  return <SavedTweetsLayout>{page}</SavedTweetsLayout>;
};
