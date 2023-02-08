import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

  const goToGenerateTweets = () => push("/generate-tweets");

  return (
    <div>
      <p
        className="mt-20 w-[50%] text-5xl font-bold leading-[75px] text-white drop-shadow-lg
    "
      >
        Keep Your Followers Engaged.<br></br> Generate a
        <span className="text-[#1DA1F2]"> Tweet</span> in a second!
      </p>
      <button
        className="rounded-full bg-white px-6 py-1 text-[#1DA1F2]"
        onClick={goToGenerateTweets}
      >
        Generate
      </button>
    </div>
  );
}
