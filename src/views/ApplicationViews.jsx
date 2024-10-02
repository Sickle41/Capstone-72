import { Routes, Route, Outlet } from "react-router-dom";
import { Welcome } from "../components/welcome/Welcome";
import { Navbar } from "../components/nav/Navbar";

export const ApplicationViews = () => {


    return (
        <>

        <Navbar/>

        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route index element={<Welcome />} />
            
            </Route>
        </Routes>
        </>
    )
}