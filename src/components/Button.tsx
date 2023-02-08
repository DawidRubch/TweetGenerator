import { clsx } from "clsx";

interface Props {
  text: string;
  outline?: boolean;
  textColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export default function Button({
  text,
  outline,
  textColor = "#000",
  backgroundColor = "#fff",
  children,
}: Props) {
  const classes = clsx(
    { border: outline },
    `text-[${textColor}]`,
    `bg-[${backgroundColor}]`,
    `border-[${textColor}]`,
    `dark:hover:bg-${backgroundColor}`,
    "rounded-md",
    "p-1"
  );

  return (
    <button className={classes}>
      {children}
      {text}
    </button>
  );
}
