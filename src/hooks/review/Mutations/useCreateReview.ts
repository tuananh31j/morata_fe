import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import reviewService from '~/services/reviews.service';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { useTypedSelector } from '~/store/store';
import { ReviewData } from '~/types/Review';

const useCreateReview = () => {
    const queryClient = useQueryClient();
    const orderId = useTypedSelector((state) => state.rateProductSlice.orderId);
    const productId = useTypedSelector((state) => state.rateProductSlice.orderId);
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data: ReviewData) => reviewService.createReview(data),
        onSuccess() {
            // setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS] });
            // }, 100);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.ORDERS],
            });

            dispatch(setReviewData({ orderId: '', isOpen: false }));
        },
        onError(error) {
            console.log(error.message);
        },
    });
};

export default useCreateReview;
