import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { LandingPageAstronaut } from "../icons/LandingPageAstronaut";
import { TwitterIcon } from "../icons/TwtterIcon";
import HomeLayout from "./layout";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  visible: { opacity: 1, x: 0, y: 0 },
};

export default function Home() {
  const { push } = useRouter();

  const goToGenerateTweets = () => push("/generate-tweets");

  return (
    <main className="flex h-5/6 items-center">
      <motion.div
        variants={variants}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-5/6 flex-col items-center "
      >
        <h1
          className="landing-page-drop-shadow text-5xl font-bold leading-[75px] text-white drop-shadow-lg
    "
        >
          Keep Your Followers Engaged.<br></br> Generate a
          <span className="text-[#1DA1F2]"> Tweet</span> in a second!
        </h1>
        <button
          className="mt-20  flex items-center rounded-full bg-white  px-16 py-2 text-3xl text-[#1DA1F2]"
          onClick={goToGenerateTweets}
        >
          <TwitterIcon width={40} height={34} />
          <span className="ml-5">Generate</span>
        </button>
      </motion.div>
      <motion.div
        variants={variants}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="ml-10"
      >
        <LandingPageAstronaut />
      </motion.div>
    </main>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};
