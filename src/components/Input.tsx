import React, { ChangeEvent } from "react";

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    style?: React.CSSProperties; // 추가된 부분
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className, style }) => {
    // 추가한 스타일
    const inputStyle: React.CSSProperties = {
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        ...style, // 다른 스타일과 병합
    };

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
            style={inputStyle} // 변경된 스타일 적용
        />
    );
};

export default Input;
