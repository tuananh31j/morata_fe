import { ReactNode } from 'react';
import AuthProtected from './AuthProtected';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { MAIN_ROUTES } from '~/constants/router';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedSelf = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const shippingPath = MAIN_ROUTES.SHIPPING;
    const checkoutPath = MAIN_ROUTES.CHECKOUT;
    const checkCart = useGetMyCart();
    const listCart = checkCart.data?.data.items;

    if (currentPath === shippingPath && listCart?.length === 0) return <Navigate to={'/'} replace />;
    // if (currentPath === checkoutPath && listCart?.length === 0 && ) return <Navigate to={'/'} replace />;

    return <AuthProtected>{children}</AuthProtected>;
};

export default ProtectedSelf;
