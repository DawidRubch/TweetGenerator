import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";

// This hook is used to count the number of free trials left for the user in the session.
export const useCountFreeTrials = () => {
  const { status } = useSession();
  const { showSnackbar } = useSnackbar();
  const [freeTrialsLeft, setFreeTrialsLeft] = useSessionStorage(
    "freeTrials",
    3
  );

  const getCanCallOpenAI = () => {
    if (status === "authenticated") return true;

    if (freeTrialsLeft > 0) {
      setFreeTrialsLeft((prev) => prev - 1);

      showSnackbar({
        message: `You have ${freeTrialsLeft} free trials left`,
        type: "info",
        time: 2000,
      });
      return true;
    } else {
      showSnackbar({
        message: `You have no free trials left`,
        type: "error",
        time: 2000,
      });

      return false;
    }
  };

  return {
    getCanCallOpenAI,
  };
};

const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));

      return valueToStore;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };

  return [storedValue, setValue] as const;
};
