import { Routes, Route, Outlet } from "react-router-dom";
import { Welcome } from "../components/welcome/Welcome";
import { Navbar } from "../components/nav/Navbar";
import { Login } from "../components/auth/Login";
import { Profile } from "../components/profile/Profile";

export const ApplicationViews = () => {


    return (
        <>

        <Navbar/>

        <Routes>

            <Route path="/auth" element={<Login />} />

            <Route path="/" element={<Outlet />}>
                <Route index element={<Welcome />} />

                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
        </>
    )
}