import { ReactNode, useLayoutEffect, useState } from 'react';
import AuthProtected from './AuthProtected';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { MAIN_ROUTES } from '~/constants/router';
import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';

const ProtectedSelf = ({ children }: { children: ReactNode }) => {
    const [isValid, setIsValid] = useState(true);
    const checkCart = useGetMyCart();
    const location = useLocation();
    const shippingAddress = useTypedSelector((state) => state.order.shippingAddress);
    const currentPath = location.pathname;
    const shippingPath = MAIN_ROUTES.SHIPPING;
    const checkoutPath = MAIN_ROUTES.CHECKOUT;

    const listCart = checkCart.data?.data.items;
    const isFormShippingFilled = Object.values(shippingAddress).every((val) => val !== '');

    useLayoutEffect(() => {
        if (currentPath === shippingPath && listCart && !checkCart.isLoading && listCart.length === 0) {
            setIsValid(false);
        }
        if (currentPath === checkoutPath && listCart && !checkCart.isLoading && listCart.length === 0) {
            if (!isFormShippingFilled) {
                setIsValid(false);
            }
        }
    }, [currentPath, shippingPath, checkoutPath, listCart, checkCart.isLoading, isFormShippingFilled]);
    return (
        <>
            {isValid && !checkCart.isLoading ? <AuthProtected>{children}</AuthProtected> : <Navigate to='/' replace />}
            {checkCart.isLoading && <div>Loading...</div>}
        </>
    );
};

export default ProtectedSelf;
