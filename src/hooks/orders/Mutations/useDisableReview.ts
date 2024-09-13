import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { MAIN_ROUTES } from '~/constants/router';
import orderService from '~/services/order.service';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

export default function useDisabledReview() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: { orderId: string; productVariationId: string; productId: string }) =>
            orderService.disabledReview(data),
        onSuccess(res) {
            const orderId = res?.data.data.orderId;
            const productId = res?.data.data.productId;
            const productVariationId = res?.data.data.productVariationId;

            if (!res.data.data.isReviewable) {
                showMessage(res.data.message, 'warning');
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS, orderId] });
            } else {
                dispatch(setReviewData({ orderId, isOpen: false, productVariationId }));
                navigate(`${MAIN_ROUTES.PRODUCTS}/${productId}`);
            }
        },
        onError: (error: IErrorResponse) => {
            console.log(error.response.data.message);
        },
    });
}
