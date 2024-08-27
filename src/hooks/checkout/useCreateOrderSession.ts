import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { checkoutService } from '~/services/checkout.service';
import { IPayloadItemsOrder } from '~/types/checkout/Checkout';
import showMessage from '~/utils/ShowMessage';

export const useMutationCheckOutSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['CREATE_ORDER_SESSION'],
        mutationFn: (payload: { items: IPayloadItemsOrder[] | undefined; currency: string }) =>
            checkoutService.createOrderSession(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
            if (data.sessionUrl) {
                window.location.href = data.sessionUrl;
            } else {
                console.error('Không tìm thấy sessionUrl trong response.');
            }
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
