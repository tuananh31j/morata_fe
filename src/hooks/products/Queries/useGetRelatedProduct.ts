import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

export const useGetRelatedProduct = (body: { cateId: string; id: string }) => {
    return useQuery({
        queryKey: [QUERY_KEY.RELATED, body.id],
        queryFn: () => productService.getRelated(body),
    });
};
