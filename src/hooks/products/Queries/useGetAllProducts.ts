import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

/* eslint-disable */
const useGetAllProducts = (params?: any) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params), ...Object.keys(params)],
        queryFn: () => productService.getAllProducts(params),
    });
};
/* eslint-enable */

export default useGetAllProducts;
