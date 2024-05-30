import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useGetTopDealsProducts = () => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS],
        queryFn: () => productService.getTopDeals(),
    });
};

export default useGetTopDealsProducts;
