import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthFormWrapper from "../components/AuthFormWrapper"; // AuthFormWrapper를 import합니다.

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            setError("Failed to register");
        }
    };

    return (
        <AuthFormWrapper title="Register">
            {" "}
            {/* AuthFormWrapper를 사용하고, 제목을 "Register"으로 설정합니다. */}
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 mb-4" />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 mb-4" />
                <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full h-12 mb-4" />
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <Button onClick={handleSubmit} className="w-full h-12 text-lg">
                    Register
                </Button>
            <div className="flex justify-end mt-4">
                <Link to="/login" className="text-sm text-indigo-950 hover:underline">
                    Back to Login
                </Link>
            </div>
        </AuthFormWrapper>
    );
};

export default Register;
