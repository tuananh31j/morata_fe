import { useQuery } from '@tanstack/react-query';
import { Params } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

export const useSearchProductQuery = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params)],
        queryFn: () => productService.getAllProducts(params),
        enabled: !!params.search,
    });
};
