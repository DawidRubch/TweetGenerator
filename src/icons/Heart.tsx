import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

type Props = {
  full?: boolean;
  width?: number;
  height?: number;
};

export const Heart: React.FC<Props> = ({ full, width = 34, height = 30 }) => {
  const controls = useAnimationControls();

  const animateFromFull = async () => {
    await controls.start({
      fill: "none",
    });
    await controls.start({
      stroke: "#fff",
    });
  };

  const animateToFull = async () => {
    await controls.start({
      stroke: "#e0245e",
    });

    await controls.start({
      fill: "#e0245e",
    });
  };

  useEffect(() => {
    if (full) {
      animateToFull().catch((e) => console.error(e));
    } else {
      animateFromFull().catch((e) => console.error(e));
    }
  }, [full]);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        animate={controls}
        d="M15.2598 27.2741L15.2576 27.2722C10.9365 23.3537 7.47067 20.2031 5.06765 17.2632C2.68111 14.3434 1.5 11.8152 1.5 9.16667C1.5 4.84688 4.85997 1.5 9.16667 1.5C11.6132 1.5 13.9862 2.64669 15.5284 4.44359L16.6667 5.76981L17.8049 4.44359C19.3471 2.64669 21.7201 1.5 24.1667 1.5C28.4734 1.5 31.8333 4.84688 31.8333 9.16667C31.8333 11.8152 30.6522 14.3434 28.2657 17.2632C25.8627 20.2031 22.3969 23.3537 18.0757 27.2722L18.0736 27.2741L16.6667 28.5549L15.2598 27.2741Z"
        stroke={full ? "#DB2C2C" : "white"}
        fill={full ? "#DB2C2C" : "none"}
        transition={{ duration: 1 }}
        strokeWidth="3"
      />
    </svg>
  );
};
