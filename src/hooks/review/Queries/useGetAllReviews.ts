import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';
import { Params } from '~/types/Api';

const useGetAllReviews = (query: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.REVIEWS, ...Object.values(query)],
        queryFn: () => reviewService.getAllReviews(query),
    });
};

export default useGetAllReviews;
