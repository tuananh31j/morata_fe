import { useQueries } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import cateogoryService from '~/services/category.service';
import productService from '~/services/product.service';

const useQueriesHomepage = () => {
    return useQueries({
        queries: [
            {
                queryKey: [QUERY_KEY.PRODUCTS],
                queryFn: () => productService.getAllProducts(),
            },
            {
                queryKey: [QUERY_KEY.PRODUCTS, QUERY_KEY.DEALS],
                queryFn: () => productService.getTopDeals(),
            },
            {
                queryKey: [QUERY_KEY.PRODUCTS, QUERY_KEY.REVIEWS],
                queryFn: () => productService.getTopReviews(),
            },
            {
                queryKey: [QUERY_KEY.PRODUCTS, QUERY_KEY.LATEST],
                queryFn: () => productService.getLatest(),
            },
            {
                queryKey: [QUERY_KEY.CATEGORIES, QUERY_KEY.POPULARCATEGORIES],
                queryFn: () => cateogoryService.getPopular(),
            },
        ],
    });
};

export default useQueriesHomepage;
