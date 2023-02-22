import { createContext, useContext, useState } from "react";
import { Snackbar } from "../components/Popups";

type SnackBarProps = {
  open: boolean;
  message: string;
  type: "success" | "error" | "info";
};

type SnackbarContext = {
  showSnackbar: (params: {
    message: string;
    type: "success" | "error" | "info";
    time: number;
  }) => void;
};

const SnackBarInitialState: SnackBarProps = {
  open: false,
  message: "",
  type: "info",
};

const SnackbarContext = createContext<SnackbarContext>({
  showSnackbar: ({}) => {},
});

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackBar, setSnackBar] = useState<SnackBarProps>(SnackBarInitialState);

  const showSnackbar = (params: {
    message: string;
    type: "success" | "error" | "info";
    time: number;
  }) => {
    setSnackBar({
      open: true,
      message: params.message,
      type: params.type,
    });

    setTimeout(() => {
      setSnackBar({ ...snackBar, open: false });
    }, params.time);
  };

  const handleClose = () => {
    setSnackBar({ ...snackBar, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar
        message={snackBar.message}
        open={snackBar.open}
        handleClose={handleClose}
        type={snackBar.type}
      />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
