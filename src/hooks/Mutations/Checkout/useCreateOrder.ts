import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { checkoutService } from '~/services/checkout.service';
import { ICheckoutCash } from '~/types/checkout/Checkout';

export const useMutationCreateOrder = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.CHECKOUT],
        mutationFn: (payload: ICheckoutCash) => checkoutService.createOrder(payload),
        onSuccess: () => {
            navigate('/success', { state: { authorized: true } });
        },
    });
};
