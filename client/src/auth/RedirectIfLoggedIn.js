import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

function RedirectIfLoggedIn({ children }) {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/pools" replace />;
    }

    return children;
}

export default RedirectIfLoggedIn;