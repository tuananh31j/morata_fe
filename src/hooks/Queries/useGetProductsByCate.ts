import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useGetProductsByCate = (id: string, params: { page: number; limit: number }) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, id, params.page],
        queryFn: () => productService.getProductsByCatregory(id, params),
    });
};

export default useGetProductsByCate;
