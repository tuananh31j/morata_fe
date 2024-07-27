import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { RootState } from '~/store/store';
import { IActionCartPayload } from '~/types/cart/CartPayload';

export const useMutationRemoveItem = () => {
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const { mutate: removeItem, ...rest } = useMutation({
        mutationKey: ['REMOVEITEMS'],
        mutationFn: (payload: IActionCartPayload) => cartService.removeCart(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
    const handleRemoveCart = (id: string) => {
        if (user) {
            const data = {
                productVariation: id,
                userId: user._id,
            };
            removeItem(data);
        }
    };

    return { handleRemoveCart, ...rest };
};
