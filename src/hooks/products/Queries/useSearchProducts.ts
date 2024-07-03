import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import { IParams } from '~/types/Api';

export const useSearchProductQuery = (params: IParams) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params)],
        queryFn: () => productService.getAll(params),
        enabled: !!params.search,
    });
};
