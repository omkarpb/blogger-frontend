import React from 'react';
import { useAuth } from './AuthContext';
import { Outlet, useNavigate, useLocation } from "react-router";

export const AuthRoute = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    if (!!token) {
        return <Outlet />;
    } else {
        return navigate(`/login?fromPage=${location.pathname}`);
    }
};