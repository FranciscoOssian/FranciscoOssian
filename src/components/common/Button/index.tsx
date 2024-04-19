import React from "react";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children?: any;
  className?: string;
}

const Button = ({ href, onClick, children, className }: ButtonProps) => {
  const style = `max-sm:w-[100vw] flex justify-center items-center base-button text-3xl max-sm:text-xl max-sm:px-10 w-[34.1875rem] h-[4.3125rem] ${className}`;
  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a className={style}>{children}</a>
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
