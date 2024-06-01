import { useQueries } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useQueriesProductDetail = (id: string) => {
    return useQueries({
        queries: [
            { queryKey: [QUERY_KEY, id], queryFn: () => productService.getDetail(id), refetchInterval: Infinity },
        ],
    });
};

export default useQueriesProductDetail;
