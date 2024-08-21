import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { ReviewData } from '~/types/Review';
import showMessage from '~/utils/ShowMessage';

const useCreateReview = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data: ReviewData) => reviewService.createReview(data),
        onSuccess(res) {
            // setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.RELATED] });

            // @Remove review data in redux and localstorage
            dispatch(setReviewData({ orderId: '', isOpen: false, productId: '' }));
            window.localStorage.removeItem('orderId');
            document.body.classList.remove('noscroll');
            showMessage('Review successfully', 'success');
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useCreateReview;
