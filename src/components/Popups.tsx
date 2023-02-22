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
      <div
        className={`${variants[type]} absolute top-10 right-10 flex min-w-[320px] items-center justify-between truncate whitespace-nowrap rounded-lg py-3 px-3.5 text-xs text-white shadow-md`}
      >
        <span>{message}</span>
        <button
          className="bg-transparent !p-0 text-current underline"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
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
      <div className="rounded-lg bg-white p-5 shadow-lg">{children}</div>
    </div>,
    wrapper
  );
}

const useWrapper = (wrapperId: string = "modal-root") => {
  const [wrapper, setWrapper] = useState<HTMLElement | null>(
    document.getElementById(wrapperId)
  );

  useEffect(() => {
    if (!wrapper) {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("id", wrapperId);
      document.body.appendChild(wrapper);
      setWrapper(wrapper);
    }
  }, [wrapper]);

  return wrapper;
};
