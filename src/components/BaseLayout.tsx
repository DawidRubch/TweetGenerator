import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: Props) {
  const { pathname } = useRouter();

  const bg = pathname.includes("auth")
    ? "auth-background-gradient"
    : "backgroud-gradient";

  return (
    <main className={`${bg} h-full py-10 px-20 max-lg:px-5`}>{children}</main>
  );
}
