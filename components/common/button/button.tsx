import { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ComponentProps<"button">;

const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`inline-block rounded-lg px-5 py-3 text-center text-sm font-medium hover:opacity-90 sm:w-auto ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
