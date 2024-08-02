import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useUpdateProductVariant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, variantId }: { data: FormData; variantId: string }) =>
            productService.updateProductVariant(data, variantId),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.some((key) => typeof key === 'string' && key.includes(QUERY_KEY.PRODUCTS)),
            });
        },
        onError(error) {
            console.log('Update product variant error', error);
        },
    });
};

export default useUpdateProductVariant;
