import { useQueries } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import cateogoryService from '~/services/category.service';
import productService from '~/services/product.service';

const useQueriesHomepage = () => {
    return useQueries({
        queries: [
            { queryKey: [QUERY_KEY.PRODUCTS], queryFn: () => productService.getAll(), refetchInterval: Infinity },
            {
                queryKey: [QUERY_KEY.DEALS],
                queryFn: () => productService.getTopDeals(),
                refetchInterval: Infinity,
            },
            {
                queryKey: [QUERY_KEY.REVIEWS],
                queryFn: () => productService.getTopReviews(),
                refetchInterval: Infinity,
            },
            { queryKey: [QUERY_KEY.LATEST], queryFn: () => productService.getLatest(), refetchInterval: Infinity },
            {
                queryKey: [QUERY_KEY.CATEGORIES],
                queryFn: () => cateogoryService.getPopular(),
                refetchInterval: Infinity,
            },
        ],
    });
};

export default useQueriesHomepage;
