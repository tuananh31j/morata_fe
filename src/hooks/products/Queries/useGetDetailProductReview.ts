import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useGetDetailProductReview = (id: string) => {
    const { data, isSuccess, ...rest } = useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, id],
        queryFn: () => productService.getDetailProductReview(id),
        enabled: !!id,
    });

    return { data, ...rest };
};

export default useGetDetailProductReview;
