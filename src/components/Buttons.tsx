import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export const LogOut = () => {
  const onClick = () => signOut();

  return (
    <button
      className="rounded-full bg-white px-6 py-1  font-semibold hover:bg-slate-400"
      onClick={onClick}
    >
      Logout
    </button>
  );
};

export const SignIn = () => {
  const { push } = useRouter();

  const onClick = () => push("/auth");

  return (
    <button
      className="ml-3 mr-5 rounded-full bg-white px-6 py-1 font-semibold transition hover:bg-slate-400"
      onClick={onClick}
    >
      Sign In
    </button>
  );
};
export const SignUp = () => {
  const { push } = useRouter();

  const onClick = () => push("/auth");

  return (
    <button
      onClick={onClick}
      className="rounded-full px-6 py-1 text-white outline transition hover:border-slate-400	hover:text-slate-400"
    >
      Sign Up
    </button>
  );
};

export const ButtonSkeleton = () => {
  return (
    <button
      className="ml-3 mr-5 animate-pulse rounded-full bg-white px-6 py-1 font-semibold transition "
      disabled={true}
    ></button>
  );
};
