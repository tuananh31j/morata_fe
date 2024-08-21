import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';
import { ReviewData } from '~/types/Review';
import showMessage from '~/utils/ShowMessage';

const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ReviewData) => reviewService.updateReview(data),
        onSuccess(res) {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS] });
            showMessage('Sửa đánh giá thành công', 'success');
        },
        onError(error) {
            console.log(error.message);
        },
    });
};

export default useUpdateReview;
