import { useQueries } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useQueriesHomepage = () => {
    return useQueries({
        queries: [
            { queryKey: [QUERY_KEY], queryFn: () => productService.getAll(), refetchInterval: Infinity },
            { queryKey: [QUERY_KEY], queryFn: () => productService.getTopDeals(), refetchInterval: Infinity },
        ],
    });
};

export default useQueriesHomepage;
