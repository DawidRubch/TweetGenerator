import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingTweet, Tweet } from "../../components/Tweets";
import { api } from "../../utils/api";

export default function () {
  const [tweet, setTweet] = useState("");
  const { tweets, generateTweets, isLoading } = useGenerateTweets();

  const handleGenerateTweets = () => {
    generateTweets(tweet);
  };

  const onTweetChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTweet(e.target.value);

  return (
    <main className="mt-12 flex flex-col items-center">
      <div className=" flex w-[80%] justify-between rounded-full bg-[#7978A9] py-5 px-12">
        <input
          className="w-full appearance-none border-none bg-transparent text-xl text-white placeholder:text-xl placeholder:text-white focus:outline-none"
          type="text"
          placeholder="Type tweet idea here"
          value={tweet}
          onChange={onTweetChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleGenerateTweets();
          }}
        ></input>
        <button
          onClick={handleGenerateTweets}
          disabled={isLoading}
          className="disabled:opacity-50"
        >
          <RepeatIcon isLoading={isLoading}></RepeatIcon>
        </button>
      </div>
      {isLoading ? <LoadingTweets /> : <Tweets tweets={tweets} />}
    </main>
  );
}

const LoadingTweets = () => {
  return (
    <div className="mt-10 flex w-[80%] flex-col">
      {Array.from(Array(5).keys()).map(() => (
        <LoadingTweet />
      ))}
    </div>
  );
};

const Tweets = ({ tweets }: { tweets: string[] }) => {
  return (
    <div className="mt-10 flex w-[80%] flex-col">
      {tweets.map((tweet) => (
        <Tweet tweet={tweet}></Tweet>
      ))}
    </div>
  );
};

const useGenerateTweets = () => {
  const [tweets, setTweets] = useState<string[]>([]);

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

export const RepeatIcon = ({ isLoading }: { isLoading: boolean }) => {
  const controls = useAnimationControls();

  const startAnimationLoop = () => {
    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 2,
      },
    });
  };

  const animateToInitial = () => {
    controls.start({
      rotate: 0,
      transition: {
        duration: 0.5,
      },
    });
  };

  useEffect(() => {
    if (isLoading) {
      startAnimationLoop();
    } else {
      controls.stop();
      animateToInitial();
    }
  }, [isLoading]);

  return (
    <motion.svg
      className="disabled:"
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={controls}
    >
      <path
        d="M36.25 13.5938L41.6875 19.0312L36.25 24.4688"
        stroke="#EBEEF0"
        stroke-width="3.625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M39.875 19.0312H16.3125C13.9112 19.0384 11.6103 19.9955 9.91227 21.6935C8.21427 23.3915 7.25717 25.6924 7.25 28.0938V29.9062M21.75 44.4062L16.3125 38.9688L21.75 33.5312"
        stroke="#EBEEF0"
        stroke-width="3.625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.125 38.9688H41.6875C44.0888 38.9616 46.3897 38.0045 48.0877 36.3065C49.7857 34.6085 50.7428 32.3076 50.75 29.9062V28.0938"
        stroke="#EBEEF0"
        stroke-width="3.625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </motion.svg>
  );
};
