import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Layouts from "../components/layout/Layouts";
import Connect from "../pages/Connect";
import Test from "../pages/Test";
import Login from "../pages/Login";
import Register from "../pages/Register"; // 회원가입 페이지 추가

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layouts />}>
                <Route index element={<Main />} />
                <Route path="/connect" element={<Connect />} />
            </Route>
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* 회원가입 페이지 라우팅 추가 */}
        </Routes>
    );
}
