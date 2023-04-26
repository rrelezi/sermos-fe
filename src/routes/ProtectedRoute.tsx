import React from 'react';
import { useLocation } from 'react-router-dom';
import {RouteNames} from "./routes";

interface IProtectedRoute {
    loggedIn: boolean,
    children: any
}
const ProtectedRoute = ({ loggedIn, children } : IProtectedRoute) => {

    const location = useLocation();

    if (!loggedIn) {
        const redirectParam = `${location.pathname}${location.search}`;
        window.location.href = `${RouteNames.Login}?redirect=${encodeURIComponent(redirectParam)}`;
        return null;
    }

    return children;
};

export default ProtectedRoute;
