import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../components/User/Login";
import Register from "../components/User/Register";
import RegisterConfirm from "../components/User/RegisterConfirm";
import ForgotPassword from "../components/User/ForgotPassword";
import ResetPassword from "../components/User/ResetPassword";
import GoogleLogin from "../components/User/GoogleLogin";
import Example from "../components/Home/example";
import {RouteNames} from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import UtilityService from "../services/UtilityService";

const RouterIndex = () => {
    const loggedIn = !!UtilityService.getAuthCookie();

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path={RouteNames.Login} element={<Login />} />
                <Route exact path={RouteNames.ForgotPassword} element={<ForgotPassword />} />
                <Route exact path={RouteNames.ResetPassword} element={<ResetPassword />} />
                <Route exact path={RouteNames.Register} element={<Register />} />
                <Route exact path={RouteNames.RegisterEmailVerification} element={<RegisterConfirm />} />
                <Route exact path={RouteNames.GoogleAuth} element={<GoogleLogin/>}/>
                <Route exact path={RouteNames.Home} element={
                    <ProtectedRoute loggedIn={loggedIn}>
                        <Example/>
                    </ProtectedRoute>
                }/>
                {/*<Route exact path={RouteNames.Forbidden} element={<Forbidden />} />*/}
            </Routes>
        </BrowserRouter>
    )
}

export default RouterIndex;