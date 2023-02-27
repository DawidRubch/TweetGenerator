import { atom, useAtom } from "jotai";
import { useState } from "react";
import { AnimatedPage } from "../../components/AnimatedPage";
import { LoginModal } from "../../components/LoginModal";
import { LoadingTweets, Tweet } from "../../components/Tweets";
import { RepeatIcon } from "../../icons/RepeatIcon";
import { useCountFreeTrials } from "../../lib/generate-tweets/hooks/useCountFreeTrials";
import GenereteTweetsLayout from "../../lib/layouts/GenerateTweetsLayout";
import { api } from "../../utils/api";

export default function GenereteTweetsPage() {
  const [tweet, setTweet] = useState("");
  const { tweets, generateTweets, isLoading } = useGenerateTweets();

  const { getCanCallOpenAI } = useCountFreeTrials();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleGenerateTweets = () => {
    if (!getCanCallOpenAI()) {
      setShowLoginModal(true);
      return;
    }

    generateTweets(tweet);
  };

  const onTweetChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTweet(e.target.value);

  return (
    <AnimatedPage className="mt-12 flex flex-col items-center">
      <div className=" flex w-[80%] justify-between rounded-full bg-[#7978A9] py-5 px-12 max-sm:py-1 max-sm:px-6">
        <input
          className="w-full appearance-none border-none bg-transparent text-xl text-white placeholder:text-xl placeholder:text-white focus:outline-none max-sm:placeholder:text-base max-xs:placeholder:text-sm"
          type="text"
          placeholder="Type tweet idea here"
          value={tweet}
          onChange={onTweetChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && tweet.length !== 0) handleGenerateTweets();
          }}
        ></input>
        <button
          onClick={handleGenerateTweets}
          disabled={isLoading || tweet === ""}
          className="disabled:opacity-50"
        >
          <RepeatIcon isLoading={isLoading}></RepeatIcon>
        </button>
      </div>
      {isLoading ? <LoadingTweets count={5} /> : <Tweets tweets={tweets} />}
      <LoginModal
        open={showLoginModal}
        close={() => {
          setShowLoginModal(false);
        }}
      ></LoginModal>
    </AnimatedPage>
  );
}

const Tweets = ({ tweets }: { tweets: string[] }) => {
  return (
    <div className="mt-10 flex w-[80%] flex-col">
      {tweets.map((tweet) => (
        <Tweet key={tweet} tweet={tweet}></Tweet>
      ))}
    </div>
  );
};

const generatedTweetsAtom = atom<string[]>([]);

const useGenerateTweets = () => {
  const [tweets, setTweets] = useAtom(generatedTweetsAtom);

  const { mutate: generateTweets, isLoading } =
    api.tweets.generateTweetIdeas.useMutation({
      onSuccess: (data) => {
        if (Array.isArray(data)) {
          setTweets(data);
        }
      },
    });

  return { tweets, generateTweets, isLoading };
};
GenereteTweetsPage.getLayout = (page: React.ReactElement) => (
  <GenereteTweetsLayout>{page}</GenereteTweetsLayout>
);
