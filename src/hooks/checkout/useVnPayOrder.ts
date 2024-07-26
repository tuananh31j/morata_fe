import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { checkoutService } from '~/services/checkout.service';
import { ICheckoutCash } from '~/types/checkout/Checkout';

export const useVnPayOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [`${QUERY_KEY.CHECKOUT}/VNPAY`],
        mutationFn: (payload: ICheckoutCash) => checkoutService.checkOutVnPay(payload),
        onSuccess: (data) => {
            console.log(data);
            window.location.href = `${data.checkout}`;
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
        },
    });
};
