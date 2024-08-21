import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';

const useGetReviewOfProduct = (id: string, query: { rating: string }) => {
  const cleanedObj = _.omitBy(query, _.isEmpty);
    return useQuery({
        queryKey: [QUERY_KEY.REVIEWS, id, ...Object.values(cleanedObj)],
        queryFn: () => reviewService.getReviewOfProduct(id, cleanedObj),
    });
};

export default useGetReviewOfProduct;
