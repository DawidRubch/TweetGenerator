import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BaseLayout from "../../components/BaseLayout";
import { ButtonSkeleton, LogOut, SignIn } from "../../components/Buttons";
import { Header } from "../../components/Header";
import { Heart } from "../../components/Heart";

export default function GenereteTweetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const { push } = useRouter();

  const gotoSavedTweets = () => {
    push("/saved-tweets").catch((err) => console.log(err));
  };
  return (
    <BaseLayout>
      <Header>
        <button
          onClick={gotoSavedTweets}
          className="mr-5 ml-auto flex items-center rounded-full border border-white px-6 py-1 font-semibold  text-white hover:border-slate-400	hover:text-slate-400 max-xs:px-1  max-xs:mr-1"
        >
          <Heart full={true} width={24} height={20} />
          <span className="ml-1 max-xs:ml-0"> Saved tweets</span>
        </button>

        {status === "loading" && <ButtonSkeleton />}
        {status === "unauthenticated" && <SignIn></SignIn>}
        {status === "authenticated" && <LogOut></LogOut>}
      </Header>
      {children}
    </BaseLayout>
  );
}
