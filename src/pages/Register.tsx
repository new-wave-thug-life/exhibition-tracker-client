import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password: string) => {
        const re = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{6,}$/;
        return re.test(password);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Invalid email format");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must contain at least 6 characters with at least one letter and one number");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // 여기에 fetch 로직 추가

        console.log("Form submitted:", { email, password, name });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-indigo-950">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-8 text-3xl font-bold">Register</h2>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 mb-4" />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 mb-4" />
                <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full h-12 mb-4" />
                <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 mb-4" />
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <Button onClick={handleSubmit} className="w-full h-12 text-lg">
                    Register
                </Button>
            </div>
        </div>
    );
};

export default Register;
