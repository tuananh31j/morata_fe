import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useUpdateProductVariant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, variantId }: { data: FormData; variantId: string }) =>
            productService.updateProductVariant(data, variantId),
        onSuccess: () => {
            queryClient.resetQueries({
                predicate: (query) => (query.queryKey[0] as string) === QUERY_KEY.PRODUCTS,
            });
        },
        onError(error) {
            console.log('Update product variant error', error);
        },
    });
};

export default useUpdateProductVariant;
