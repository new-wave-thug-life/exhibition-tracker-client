import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Header from "./Header";

export default function Layouts() {
    return (
        <>
            <div className="md:flex">
                <Nav className="w-full md:min-w-64 md:w-auto bg-indigo-950" />
                <div className="w-full">
                    <Header className="bg-slate-100" />
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
