import { Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.authReducer.user);
    if (user) {
        return <Navigate to={'/'} replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
