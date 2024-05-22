import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Layouts from "../components/layout/Layouts";
import Connect from "../pages/Connect";
import Test from "../pages/Test";
import Login from "../pages/Login";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layouts />}>
                <Route index element={<Main />} />
                <Route path="/connect" element={<Connect />} />
            </Route>
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />
        </Routes>
    );
}
