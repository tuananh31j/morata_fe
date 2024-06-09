import { useMutation } from '@tanstack/react-query';
import { checkoutService } from '~/services/checkout.service';
import { IAddCartPayload } from '~/types/cart/CartPayload';

export const useMutationCheckOutSession = () => {
    return useMutation({
        mutationKey: ['CREATE_ORDER_SESSION'],
        mutationFn: (payload: IAddCartPayload) => checkoutService.createOrderSession(payload),
    });
};
