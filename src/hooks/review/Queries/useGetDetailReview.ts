import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';

const useGetDetailReview = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.REVIEWS, id],
        queryFn: async () => reviewService.getDetailReview(id),
        enabled: !!id,
    });
};

export default useGetDetailReview;
