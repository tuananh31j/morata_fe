import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';

const ProtectedRouteAuth = ({ children }: { children: ReactNode }) => {
    const user = useTypedSelector((state) => state.authReducer.user);
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (!user && !isAuthPage) {
        return <Navigate to={'/'} replace />;
    }
    if (user && isAuthPage) {
        return <Navigate to={'/'} replace />;
    }
    return <>{children}</>;
};

export default ProtectedRouteAuth;
