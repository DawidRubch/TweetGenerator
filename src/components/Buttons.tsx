import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const LogOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = () => {
    setIsLoading(true);
    signOut().finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <button
      disabled={isLoading}
      className="rounded-full bg-white px-6 py-1  font-semibold hover:bg-slate-400 disabled:opacity-50 max-lg:px-3 max-lg:py-1 "
      onClick={onClick}
    >
      Logout
    </button>
  );
};

export const SignIn = () => {
  const { push } = useRouter();

  const onClick = () => {
    push("/auth").catch((err) => console.log(err));
  };

  return (
    <button
      className="ml-3 mr-5 rounded-full bg-white px-6 py-1 font-semibold transition hover:bg-slate-400 max-lg:px-3 max-lg:py-1 max-xs:px-1"
      onClick={onClick}
    >
      Sign In
    </button>
  );
};
export const SignUp = () => {
  const { push } = useRouter();

  const onClick = () => {
    push("/auth").catch((err) => console.log(err));
  };

  return (
    <button
      onClick={onClick}
      className="rounded-full px-6 py-1 text-white outline transition hover:border-slate-400	hover:text-slate-400 max-lg:px-3 max-lg:py-1 max-xs:px-1"
    >
      Sign Up
    </button>
  );
};

export const ButtonSkeleton = () => {
  return (
    <button
      className="ml-3 mr-5 animate-pulse rounded-full bg-white px-6 py-1 font-semibold transition max-lg:px-3 max-lg:py-1 "
      disabled={true}
    ></button>
  );
};
