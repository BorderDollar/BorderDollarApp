import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (location.pathname.startsWith('/admin') && user.app_role !== 'admin') {
    return <Navigate to="/pools" replace />;
  }

  return children;
}

export default RequireAuth;
