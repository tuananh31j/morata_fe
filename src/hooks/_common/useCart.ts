import { useDispatch, useSelector } from 'react-redux';
import { setClose, setOpen } from '~/store/slice/cartSlice';
import { RootState } from '~/store/store';

export const useCart = () => {
    const cart = useSelector((state: RootState) => state.cartReducer.cartOpen);
    const cartDispatch = useDispatch();
    const onClose = () => {
        cartDispatch(setClose());
    };
    const handleOpenCart = () => {
        cartDispatch(setOpen());
    };
    return { cart, onClose, handleOpenCart };
};
