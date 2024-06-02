import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import { RequestRelated } from '~/types/request';

export const useGetRelatedProduct = (body: RequestRelated) => {
    return useQuery({
        queryKey: [QUERY_KEY.RELATED],
        queryFn: () => productService.getRelated(body),
    });
};
