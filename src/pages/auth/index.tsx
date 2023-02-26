import { signIn } from "next-auth/react";
import { AnimatedPage } from "../../components/AnimatedPage";
import { Astronaut } from "./components/Astronaut";
import { AuthLayout } from "./layout";

export default function AuthPage() {
  return (
    <AnimatedPage className="flex h-5/6 w-full">
      <LeftSide />
      <RightSide />
    </AnimatedPage>
  );
}

const LeftSide = () => {
  return (
    <div className="flex h-full w-1/2 flex-col items-center justify-center   text-white">
      <Astronaut />
      <h2 className="mb-5 text-2xl font-semibold">Welcome My Friend</h2>
      <p className="text-xs">just a couple of clicks and we start</p>
    </div>
  );
};

const RightSide = () => {
  const onClick = () => {
    signIn("auth0", { callbackUrl: "/generate-tweets" });
  };

  return (
    <div className="flex h-full w-1/2 flex-col items-center justify-center p-10">
      <h1 className="mb-12 text-3xl font-semibold text-[#2D2C57]">Welcome</h1>
      <button
        onClick={onClick}
        className=" w-8/12 rounded-full bg-[#2D2C57] p-2 text-white"
      >
        Sign in
      </button>
      <button
        onClick={onClick}
        className=" mt-5 w-8/12 rounded-full border border-[#2D2C57] p-2 text-[#2D2C57]"
      >
        Sign up
      </button>
    </div>
  );
};

AuthPage.getLayout = (page: React.ReactElement) => (
  <AuthLayout>{page}</AuthLayout>
);
