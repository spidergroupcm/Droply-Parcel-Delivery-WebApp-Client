import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (user) {
        return children
    }
    return <Navigate to='/signIn' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;