import React from "react";
import RouteNames from "./routes";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../components/User/login";
import Register from "../components/User/register";
import RegisterConfirm from "../components/User/RegisterConfirm";
import ForgotPassword from "../components/User/ForgotPassword";
import ResetPassword from "../components/User/ResetPassword";

const RouterIndex = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path={RouteNames.Login} element={<Login />} />
                <Route exact path={RouteNames.ForgotPassword} element={<ForgotPassword />} />
                <Route exact path={RouteNames.ResetPassword} element={<ResetPassword />} />
                <Route exact path={RouteNames.Register} element={<Register />} />
                <Route exact path={RouteNames.RegisterEmailVerification} element={<RegisterConfirm />} />
                {/*<Route exact path={RouteNames.Forbidden} element={<Forbidden />} />*/}
            </Routes>
        </BrowserRouter>
    )
}

export default RouterIndex;