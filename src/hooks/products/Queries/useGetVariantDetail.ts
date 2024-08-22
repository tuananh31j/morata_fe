import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

export const useGetVariantDetail = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.VARIANT, id],
        queryFn: () => productService.getDetailedVariant(id),
        enabled: !!id,
    });
};
