import { ReactNode, useLayoutEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { useTypedSelector } from '~/store/store';
import AuthProtected from './AuthProtected';

const ProtectedSelf = ({ children }: { children: ReactNode }) => {
    const [isValid, setIsValid] = useState(true);
    const shippingAddress = useTypedSelector((state) => state.order.shippingAddress);
    const checkCart = useTypedSelector((state) => state.cartReducer.items);
    const location = useLocation();
    const priceValid = 50000000;
    const currentPath = location.pathname;
    const shippingPath = MAIN_ROUTES.SHIPPING;
    const checkoutPath = MAIN_ROUTES.CHECKOUT;
    const totalOrderAmount = checkCart
        ? checkCart?.reduce((total: number, product) => total + product.productVariation.price * product.quantity, 0)
        : 0;
    const isValidPrice = totalOrderAmount > 0 && totalOrderAmount < priceValid;
    const isFormShippingNotFilled = Object.values(shippingAddress).some((val) => val === '');
    useLayoutEffect(() => {
        if (currentPath === shippingPath && !isValidPrice) {
            setIsValid(false);
        }
        if (currentPath === checkoutPath) {
            if (isFormShippingNotFilled || !isValidPrice) setIsValid(false);
        }
    }, [currentPath, shippingPath, checkoutPath, isFormShippingNotFilled, isValidPrice, checkCart, totalOrderAmount]);
    console.log(isFormShippingNotFilled, !isValidPrice, 'isFormShippingNotFilled, !isValidPrice');
    return <>{isValid ? <AuthProtected>{children}</AuthProtected> : <Navigate to='/' replace />}</>;
};

export default ProtectedSelf;
