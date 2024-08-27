import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useCreateVariantions = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productService.updateVariations(data, id),
        onSuccess() {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.includes(QUERY_KEY.PRODUCTS) || query.queryKey.includes(QUERY_KEY.CART),
            });
        },
    });
};

export default useCreateVariantions;
