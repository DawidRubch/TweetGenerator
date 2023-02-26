import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ButtonSkeleton, LogOut, SignIn, SignUp } from "../components/Buttons";
import { Header } from "../components/Header";
import BaseLayout from "../components/BaseLayout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const { status } = useSession();

  const goToPricing = () => {
    push("/pricing").catch((err) => console.log(err));
  };

  return (
    <BaseLayout>
      <Header>
        <div className="ml-auto">
          <button
            className="mr-5 ml-auto rounded-full border border-white px-6 py-1 font-semibold  text-white hover:border-slate-400	hover:text-slate-400"
            onClick={goToPricing}
          >
            Pricing
          </button>

          {status === "loading" && <ButtonSkeleton />}
          {status === "unauthenticated" && (
            <>
              <SignUp />
              <SignIn />
            </>
          )}
          {status === "authenticated" && <LogOut />}
        </div>
      </Header>
      {children}
    </BaseLayout>
  );
}
