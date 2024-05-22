import React from "react";

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
    return (
        <button onClick={onClick} className={`p-2 text-white rounded-md bg-indigo-950 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-950 ${className}`}>
            {children}
        </button>
    );
};

export default Button;
