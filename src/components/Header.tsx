import { Logo } from "./Logo";

export const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="flex w-full items-center">
      <Logo />
      <h1 className="ml-5 text-3xl font-bold text-white	">TweetGenerator</h1>
      {children}
    </header>
  );
};
