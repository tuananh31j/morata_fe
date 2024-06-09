import { useMutation } from '@tanstack/react-query';
import { checkoutService } from '~/services/checkout.service';
import { IPayloadItemsOrder } from '~/types/checkout/Checkout';

export const useMutationCheckOutSession = () => {
    return useMutation({
        mutationKey: ['CREATE_ORDER_SESSION'],
        mutationFn: (payload: { items: IPayloadItemsOrder[] | undefined }) =>
            checkoutService.createOrderSession(payload),
        onSuccess: (data) => {
            if (data.sessionUrl) {
                window.location.href = data.sessionUrl;
            } else {
                console.error('Không tìm thấy sessionUrl trong response.');
            }
        },
    });
};
