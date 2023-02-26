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
      <div className="mx-4 flex flex-col p-2 ">
        <div className="flex items-center justify-between">
          <h1 className="mr-10 text-xl font-bold">
            You run out of free credits
          </h1>
          <button onClick={close} className="ml-10 text-2xl">
            {" "}
            &#x2715;
          </button>
        </div>
        <p className="text-md mt-3 mb-5 font-light">
          Login to continue using the app.
        </p>
        <button
          onClick={() => {
            signIn("auth0");
          }}
          className=" mt-5  rounded-full bg-[#2D2C57] p-2 text-white"
        >
          Login
        </button>
      </div>
    </Modal>
  );
};
