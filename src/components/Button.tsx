import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...rest
}) => {
  return (
    <motion.button
      whileHover={!rest.disabled ? { scale: 1.05 } : {}}
      whileTap={!rest.disabled ? { scale: 0.95 } : {}}
      className={`w-full py-3 rounded-xl font-semibold 
                  bg-gradient-to-r from-emerald-500 via-lime-500 to-teal-400 
                  hover:opacity-90 transition text-black shadow-lg 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${className}`}
      {...rest} // ✅ forwards props like disabled, type, onClick
    >
      {children}
    </motion.button>
  );
};

export default Button;
