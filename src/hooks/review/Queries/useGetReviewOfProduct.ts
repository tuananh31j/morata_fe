import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';

const useGetReviewOfProduct = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.REVIEWS, id],
        queryFn: () => reviewService.getReviewOfProduct(id),
    });
};

export default useGetReviewOfProduct;
