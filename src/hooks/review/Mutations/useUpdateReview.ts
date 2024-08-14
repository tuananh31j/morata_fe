import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';
import { ReviewData } from '~/types/Review';

const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ReviewData) => reviewService.updateReview(data),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS] });
        },
        onError(error) {
            console.log(error.message);
        },
    });
};

export default useUpdateReview;
