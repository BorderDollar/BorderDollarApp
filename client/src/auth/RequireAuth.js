import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirect to /signin and save the location they were trying to go to
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;