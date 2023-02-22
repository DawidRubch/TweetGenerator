import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Logo } from "./Logo";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { pathname } = useRouter();

  const bg = pathname.includes("auth")
    ? "auth-background-gradient"
    : "backgroud-gradient";

  return (
    <div className={`${bg} h-full p-10 px-20`}>
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

  const gotoGenerateTweets = () => {
    push("/generate-tweets");
  };

  return (
    <BaseHeader>
      <button
        onClick={gotoGenerateTweets}
        className="mr-5 ml-auto rounded-full border border-white px-6 py-1 font-semibold  text-white"
      >
        Generate tweets
      </button>
      {status === "authenticated" ? <LogOut></LogOut> : <SignIn></SignIn>}
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

      {status === "loading" && (
        <button
          className="ml-3 mr-5 animate-pulse rounded-full bg-white px-6 py-1 font-semibold transition hover:bg-slate-400"
          disabled={true}
        ></button>
      )}
      {status === "unauthenticated" && <SignIn></SignIn>}
      {status === "authenticated" && <LogOut></LogOut>}
    </BaseHeader>
  );
};

const PricingPageHeader = () => {
  const { status } = useSession();
  return (
    <BaseHeader>
      <div className="ml-auto">
        {status === "unauthenticated" ? (
          <>
            <SignUp />
            <SignIn />
          </>
        ) : (
          <LogOut />
        )}
      </div>
    </BaseHeader>
  );
};

const HomePageHeader = () => {
  const { push } = useRouter();
  const { status } = useSession();
  return (
    <BaseHeader>
      <div className="ml-auto">
        <button
          className="mr-5 ml-auto rounded-full border border-white px-6 py-1 font-semibold  text-white"
          onClick={() => push("/pricing")}
        >
          Pricing
        </button>

        {status === "unauthenticated" ? (
          <>
            <SignUp />
            <SignIn />
          </>
        ) : (
          <LogOut />
        )}
      </div>
    </BaseHeader>
  );
};

const BaseHeader = ({ children }: Partial<Props>) => {
  return (
    <header className="flex w-full items-center">
      <Logo />
      <h1 className="ml-5 text-3xl font-bold text-white	">TweetGenerator</h1>
      {children}
    </header>
  );
};

const LogOut = () => {
  const onClick = () => {
    signOut();
  };

  return (
    <button
      className="rounded-full bg-white px-6 py-1  font-semibold"
      onClick={onClick}
    >
      Logout
    </button>
  );
};

const SignIn = () => {
  const { push } = useRouter();

  const onClick = () => {
    push("/auth");
  };

  return (
    <button
      className="ml-3 mr-5 rounded-full bg-white px-6 py-1 font-semibold transition hover:bg-slate-400"
      onClick={onClick}
    >
      Sign In
    </button>
  );
};
const SignUp = () => {
  const { push } = useRouter();

  const onClick = () => {
    push("/auth");
  };

  return (
    <button
      onClick={onClick}
      className="rounded-full px-6 py-1 text-white outline transition hover:border-slate-400	hover:text-slate-400"
    >
      Sign Up
    </button>
  );
};
