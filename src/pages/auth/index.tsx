import { signIn } from "next-auth/react";
import { useState } from "react";
import { AnimatedPage } from "../../components/AnimatedPage";
import { Astronaut } from "../../lib/auth/components/Astronaut";
import { AuthLayout } from "../../lib/layouts/AuthLayout";

export default function AuthPage() {
  return (
    <AnimatedPage className="flex h-5/6 w-full">
      <LeftSide />
      <RightSide />
      <MobileAuthPage />
    </AnimatedPage>
  );
}

const LeftSide = () => {
  return (
    <div className="flex h-full w-1/2 flex-col items-center justify-center   text-white max-sm:hidden">
      <Astronaut />
      <h2 className="mb-5 text-2xl font-semibold">Welcome My Friend</h2>
      <p className="text-xs">just a couple of clicks and we start</p>
    </div>
  );
};

const RightSide = () => {
  return (
    <div className="flex h-full w-1/2 flex-col items-center justify-center p-10 max-sm:hidden">
      <h1 className="mb-12 text-3xl font-semibold text-[#2D2C57]">Welcome</h1>
      <AuthButtons />
    </div>
  );
};

const MobileAuthPage = () => {
  return (
    <div className=" hidden h-full w-full flex-col items-center max-sm:flex">
      <h1 className="mb-12 hidden text-center text-3xl font-semibold text-[#2D2C57] max-sm:block max-sm:text-white">
        Welcome
      </h1>
      <AuthButtons />
      <Astronaut />
    </div>
  );
};

const AuthButtons = () => {
  const { isLoading, onClick } = useSignIn();
  return (
    <>
      <button
        disabled={isLoading}
        onClick={onClick}
        className=" w-8/12 rounded-full bg-[#2D2C57] p-2 text-white disabled:opacity-50 max-sm:bg-white max-sm:text-[#2D2C57]"
      >
        Sign in
      </button>
      <button
        disabled={isLoading}
        onClick={onClick}
        className=" mt-5 w-8/12 rounded-full border border-[#2D2C57] p-2 text-[#2D2C57]  disabled:opacity-50 max-sm:border-white max-sm:text-white"
      >
        Sign up
      </button>
    </>
  );
};

const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = () => {
    setIsLoading(true);
    signIn("auth0", { callbackUrl: "/generate-tweets" }).finally(() =>
      setIsLoading(false)
    );
  };

  return { isLoading, onClick };
};

AuthPage.getLayout = (page: React.ReactElement) => (
  <AuthLayout>{page}</AuthLayout>
);
