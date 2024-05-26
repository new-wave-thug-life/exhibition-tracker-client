import React, { useState } from "react";
import { Link } from "react-router-dom"; // react-router-dom에서 Link 불러오기
import Input from "../components/Input";
import Button from "../components/Button";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Invalid email format");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters");
            return;
        }

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            setError("Failed to login");
        }
    };

    return (
        <AuthFormWrapper title="Login">
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 mb-4" />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 mb-4" />
                {error && <p className="mb-4 text-red-500">{error}</p>}
            <Button onClick={handleSubmit} className="w-full h-12 text-lg text-white bg-indigo-950 hover:bg-indigo-850">
                    Login
                </Button>
                <div className="flex justify-between mt-4">
                <Link to="/forgot-password" className="text-sm text-indigo-950 hover:underline">
                    Forgot password?
                </Link>
                <span className="ml-40">
                    <Link to="/register" className="text-sm text-indigo-950 hover:underline">
                        Sign up
                    </Link>
                </span>
            </div>
        </AuthFormWrapper>
    );
};

export default Login;
