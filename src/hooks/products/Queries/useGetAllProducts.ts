import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

// get all products new model
const useGetAllProducts = () => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS],
        queryFn: () => productService.getAllProducts(),
    });
};

export default useGetAllProducts;
