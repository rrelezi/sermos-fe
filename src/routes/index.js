import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from "../components/User/Login";
import Register from "../components/User/Register";
import RegisterConfirm from "../components/User/RegisterConfirm";
import ForgotPassword from "../components/User/ForgotPassword";
import ResetPassword from "../components/User/ResetPassword";
import GoogleLogin from "../components/User/GoogleLogin";
import ProtectedRoute from "./ProtectedRoute";
import Dash from "../components/Home/Dash";

import '../styles/index.css';
import '../styles/appIndex.css';
import 'remixicon/fonts/remixicon.css';
import "react-chat-elements/dist/main.css";

import {RouteNames} from "./routes";
import UtilityService from "../services/UtilityService";
import ProfileDetails from "../components/Profile/ProfileDetails";
import ChatScreen from "../components/Chat/ChatScreen";


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
                        <Dash/>
                    </ProtectedRoute>
                }>
                    <Route exact path={'/main/home/profile'} element={<ProfileDetails />} />
                    <Route exact path={'/main/home/chat'} element={<ChatScreen />} />
                </Route>
                {/*<Route exact path={RouteNames.Forbidden} element={<Forbidden />} />*/}
            </Routes>
        </BrowserRouter>
    )
}

export default RouterIndex;