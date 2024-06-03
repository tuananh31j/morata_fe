import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import { IParams } from '~/types/Api';

const useGetProducts = (params: IParams) => {
    console.log('hook', params);
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params)],
        queryFn: () => productService.getAll(params),
    });
};

export default useGetProducts;
