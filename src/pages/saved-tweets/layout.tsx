import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AnimatedPage } from "../../components/AnimatedPage";
import BaseLayout from "../../components/BaseLayout";
import { ButtonSkeleton, LogOut } from "../../components/Buttons";
import { Header } from "../../components/Header";
import { TwitterIcon } from "../../icons/TwtterIcon";

export default function SavedTweetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const { push } = useRouter();

  const gotoGenerateTweets = () => {
    push("/generate-tweets");
  };
  return (
    <BaseLayout>
      <Header>
        <button
          onClick={gotoGenerateTweets}
          className="mr-5 ml-auto flex items-center rounded-full border border-white px-6 py-1 font-semibold  text-white hover:border-slate-400	hover:text-slate-400"
        >
          <TwitterIcon width={25} height={20} />
          <span className="ml-2"> Generate tweets</span>
        </button>
        {status === "authenticated" && <LogOut></LogOut>}
        {status === "unauthenticated" && <LogOut></LogOut>}
        {status === "loading" && <ButtonSkeleton />}
      </Header>
      {children}
    </BaseLayout>
  );
}
