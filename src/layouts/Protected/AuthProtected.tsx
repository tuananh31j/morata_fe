import { Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';

const ProtectedRouteAuth = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.authReducer.user);
    if (!user) {
        return <Navigate to={'/auth/login'} replace />;
    }
    return <>{children}</>;
};

export default ProtectedRouteAuth;
