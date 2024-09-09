import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { setOpen } from '~/store/slice/cartSlice';
import { IAddCartPayload } from '~/types/cart/CartPayload';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

export const useMutationCart = () => {
    const cartDispatch = useDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['ADD_TO_CART'],
        mutationFn: (payload: IAddCartPayload) => cartService.addToCart(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
            cartDispatch(setOpen());
        },
        onError: (error: IErrorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
