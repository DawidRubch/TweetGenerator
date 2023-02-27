import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export const RepeatIcon = ({ isLoading }: { isLoading: boolean }) => {
  const controls = useRepeatAnimation(isLoading);
  return (
    <motion.svg
      className="disabled:"
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={controls}
    >
      <path
        d="M36.25 13.5938L41.6875 19.0312L36.25 24.4688"
        stroke="#EBEEF0"
        strokeWidth="3.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.875 19.0312H16.3125C13.9112 19.0384 11.6103 19.9955 9.91227 21.6935C8.21427 23.3915 7.25717 25.6924 7.25 28.0938V29.9062M21.75 44.4062L16.3125 38.9688L21.75 33.5312"
        stroke="#EBEEF0"
        strokeWidth="3.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.125 38.9688H41.6875C44.0888 38.9616 46.3897 38.0045 48.0877 36.3065C49.7857 34.6085 50.7428 32.3076 50.75 29.9062V28.0938"
        stroke="#EBEEF0"
        strokeWidth="3.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

const useRepeatAnimation = (isLoading: boolean) => {
  const controls = useAnimationControls();

  const startAnimationLoop = async () => {
    await controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 2,
      },
    });
  };

  const animateToInitial = async () => {
    await controls.start({
      rotate: 0,
      transition: {
        duration: 0.5,
      },
    });
  };

  useEffect(() => {
    if (isLoading) {
      startAnimationLoop().catch((e) => console.error(e));
    } else {
      controls.stop();
      animateToInitial().catch((e) => console.error(e));
    }
  }, [isLoading]);

  return controls;
};
