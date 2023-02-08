import { signIn } from "next-auth/react";

export default function () {
  return <div onClick={() => signIn()}>Login</div>;
}
