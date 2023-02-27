import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SnackBarProps = {
  open: boolean;
  message: string;
  type: keyof typeof variants;
  handleClose: () => void;
};

const variants = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};
 
export function Snackbar({ open, message, handleClose, type }: SnackBarProps) {

  

  return open ? (
    <>
      <motion.div
        initial={{ opacity: 0, x: 200, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        className={`${variants[type]} fixed bottom-10 right-10 flex min-w-[320px] items-center justify-between truncate whitespace-nowrap rounded-lg py-3 px-3.5 text-white shadow-md`}
      >
        <span className=" text-md">{message}</span>
        <button
          className="text-md ml-3 bg-transparent !p-0 text-current "
          onClick={handleClose}
        >
          &#x2715;
        </button>
      </motion.div>
    </>
  ) : null;
}

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
};

export function Modal({ open, children }: ModalProps) {
  const wrapper = useWrapper();

  if (!wrapper || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white  shadow-lg">{children}</div>
    </div>,
    wrapper
  );
}

const useWrapper = (wrapperId = "modal-root") => {
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const wrapper = document.getElementById(wrapperId);

    if (!wrapper) {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("id", wrapperId);
      document.body.appendChild(wrapper);
      setWrapper(wrapper);
    }
    setWrapper(wrapper);
  }, [wrapper]);

  return wrapper;
};
