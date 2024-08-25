import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useGetFilterByCategory = (cateId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.FILTER_BYCATE, QUERY_KEY.PRODUCTS, cateId],
        queryFn: () => productService.getFilterByCategory(cateId),
        enabled: !!cateId,
    });
};

export default useGetFilterByCategory;
