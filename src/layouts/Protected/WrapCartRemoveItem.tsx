import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { removeAll } from '~/store/slice/cartSlice';

export default function WrapCartRemoveItem({ children }: { children: ReactNode }) {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (
            location.pathname !== MAIN_ROUTES.SHIPPING &&
            location.pathname !== MAIN_ROUTES.CART &&
            location.pathname !== MAIN_ROUTES.CHECKOUT
        ) {
            dispatch(removeAll());
        }
    }, [location]);
    return <>{children}</>;
}
