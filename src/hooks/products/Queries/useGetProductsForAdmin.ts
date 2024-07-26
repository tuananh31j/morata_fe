import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useGetProducts = (params?: any) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params), Object.keys(params).join],
        queryFn: () => productService.getAllProductForAdmin(params),
    });
};

export default useGetProducts;
