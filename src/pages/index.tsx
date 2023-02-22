import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AnimatedPage } from "../components/AnimatedPage";
import { LandingPageAstronaut } from "../icons/LandingPageAstronaut";


const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
}

export default function Home() {
  const { push } = useRouter();

  const goToGenerateTweets = () => push("/generate-tweets");

  return (
    <AnimatedPage className="flex h-5/6 items-center">
      <motion.div
        variants={variants}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <h1
          className="landing-page-drop-shadow w-5/6 text-5xl font-bold leading-[75px] text-white drop-shadow-lg
    "
        >
          Keep Your Followers Engaged.<br></br> Generate a
          <span className="text-[#1DA1F2]"> Tweet</span> in a second!
        </h1>
        <button
          className="mt-10 rounded-full bg-white  px-16 py-2 text-xl text-[#1DA1F2]"
          onClick={goToGenerateTweets}
        >
          Generate
        </button>
      </motion.div>
      <div className="ml-10">
        <LandingPageAstronaut />
      </div>
    </AnimatedPage>
  );
}
