import { signIn } from "next-auth/react";
import { Modal } from "./Popups";

export const LoginModal = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  return (
    <Modal open={open}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-5">
          <h1 className="mr-10 text-xl font-bold">
            You run out of free credits
          </h1>
          <button onClick={close} className="ml-20 text-2xl">
            &#x2715;
          </button>
        </div>
        <div className="w-full border-b border-black opacity-20" />
        <p className="text-md mt-3 mb-5 p-2 px-5 font-light">
          Login to continue using the app.
        </p>
        <div className="w-full border-b border-black opacity-20" />
        <div className="ml-auto p-5">
          <button
            className="mr-3 rounded bg-slate-400 p-2 px-5 text-white"
            onClick={close}
          >
            Close
          </button>
          <button
            onClick={() => {
              signIn("auth0");
            }}
            className="rounded bg-[#2D2C57] p-2 px-8 text-white"
          >
            Login
          </button>
        </div>
      </div>
    </Modal>
  );
};
