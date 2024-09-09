import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import { Params } from '~/types/Api';

const useGetProducts = (params?: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params || {}), ...Object.keys(params || {})],
        queryFn: () => productService.getAllProductForAdmin(params),
    });
};

export default useGetProducts;
