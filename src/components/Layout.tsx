import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Logo } from "./Logo";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="background-gradient h-screen w-screen p-10">
      <Header />
      {children}
    </div>
  );
}

const Header = () => {
  const { route } = useRouter();

  if (route.includes("auth")) {
    return <BaseHeader />;
  }
  if (route.includes("generate-tweets")) {
    return <GenerateTweetsHeader />;
  }
  if (route.includes("saved-tweets")) {
    return <SavedTweetsPageHeader />;
  }
  if (route.includes("pricing")) {
    return <PricingPageHeader />;
  }
  return <HomePageHeader />;
};

const SavedTweetsPageHeader = () => {
  const { status } = useSession();
  const { push } = useRouter();

  return (
    <BaseHeader>
      <button>Generate tweets</button>
      {status === "authenticated" ? (
        <button>Log out</button>
      ) : (
        <button className="rounded-md bg-white" onClick={() => push("/auth")}>
          Sign in
        </button>
      )}
    </BaseHeader>
  );
};

const GenerateTweetsHeader = () => {
  const { status } = useSession();
  const { push } = useRouter();

  const gotoSavedTweets = () => {
    push("/saved-tweets");
  };

  return (
    <BaseHeader>
      <button
        onClick={gotoSavedTweets}
        className="mr-5 ml-auto rounded-full border border-white px-6 py-1 font-semibold  text-white"
      >
        Saved tweets
      </button>
      <button className="rounded-full bg-white px-6 py-1  font-semibold">
        {status === "authenticated" ? "Log out" : "Sign in"}
      </button>
    </BaseHeader>
  );
};

const PricingPageHeader = () => {
  return (
    <BaseHeader>
      <div className="ml-auto">
        <SignIn></SignIn>
        <SignUp />
      </div>
    </BaseHeader>
  );
};

const HomePageHeader = () => {
  const { push } = useRouter();
  return (
    <BaseHeader>
      <div className="ml-auto">
        <button
          className="mr-20 text-white hover:text-slate-400"
          onClick={() => push("/pricing")}
        >
          Pricing
        </button>
        <SignUp />
        <SignIn />
      </div>
    </BaseHeader>
  );
};

const BaseHeader = ({ children }: Partial<Props>) => {
  return (
    <header className="flex items-center">
      <Logo />
      <h1 className="ml-2 text-3xl font-bold text-white	">TweetGenerator</h1>
      {children}
    </header>
  );
};

const SignIn = () => (
  <button className="ml-3 mr-5 rounded-full bg-white px-6 py-1 font-semibold transition hover:bg-slate-400">
    Sign In
  </button>
);
const SignUp = () => (
  <button className="rounded-full px-6 py-1 text-white outline transition hover:border-slate-400	hover:text-slate-400">
    Sign Up
  </button>
);
