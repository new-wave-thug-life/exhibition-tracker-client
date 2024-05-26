import React, { FormEvent } from "react";

interface ButtonProps {
    onClick: (e: FormEvent) => Promise<void> | void;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, style }) => {
    return (
        <button onClick={onClick} className={`px-4 py-2 bg-indigo-950 text-white rounded hover:bg-indigo-800 hover:border-indigo-700 hover:border ${className}`} style={{ width: "100%", height: "48px", ...style }}>
            {children}
        </button>
    );
};

export default Button;
