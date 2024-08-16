import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { ReviewData } from '~/types/Review';

const useCreateReview = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data: ReviewData) => reviewService.createReview(data),
        onSuccess() {
            // setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.RELATED] });

            // @Remove review data in redux and localstorage
            dispatch(setReviewData({ orderId: '', isOpen: false, productId: '' }));
            window.localStorage.removeItem('orderId');
            document.body.classList.remove('noscroll');
        },
        onError(error) {
            console.log(error.message);
        },
    });
};

export default useCreateReview;
