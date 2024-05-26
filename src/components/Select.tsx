import React from "react";

interface SelectProps {
    options: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, className }) => {
    return (
        <select value={value} onChange={onChange} className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-950 ${className}`}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;
