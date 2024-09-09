import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

export const useMutationRemoveAll = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['REMOVE'],
        mutationFn: (userId: { userId: string }) => cartService.removeAllCart(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.ORDERS],
            });
        },
        onError: (error: IErrorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
