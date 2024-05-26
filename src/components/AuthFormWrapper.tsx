import React from "react";

interface AuthFormWrapperProps {
    title: string;
    children: React.ReactNode;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ title, children }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-indigo-950">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg shadow-md" style={{ height: "450px" }}>
                <h2 className="mb-8 text-3xl font-bold">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default AuthFormWrapper;
