import { Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { MAIN_ROUTES } from '~/constants/router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const role = useSelector((state: RootState) => state.authReducer.user?.role);
    const isAdmin = role === 'admin';
    if (!isAdmin) {
        return <Navigate to={MAIN_ROUTES.LOGIN} replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
