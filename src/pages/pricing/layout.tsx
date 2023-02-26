import { useSession } from "next-auth/react";
import BaseLayout from "../../components/BaseLayout";
import { LogOut, SignIn, SignUp } from "../../components/Buttons";
import { Header } from "../../components/Header";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  return (
    <BaseLayout>
      <Header>
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
      </Header>
      {children}
    </BaseLayout>
  );
}
