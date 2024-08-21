import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useUpdateProductVariant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, variantId }: { data: FormData; variantId: string }) =>
            productService.updateProductVariant(data, variantId),
        onSuccess: () => {
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.PRODUCTS),
            });
        },
    });
};

export default useUpdateProductVariant;
