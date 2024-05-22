import React from "react";

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className }) => {
    return <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-950 ${className}`} />;
};

export default Input;
