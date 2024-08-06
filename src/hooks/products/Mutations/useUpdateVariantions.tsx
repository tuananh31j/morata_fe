import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useCreateVariantions = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productService.updateVariations(data, id),
        onSuccess() {
            queryClient.resetQueries({
                predicate: (query) => (query.queryKey[0] as string) === QUERY_KEY.PRODUCTS,
            });
        },
        onError(error) {
            throw new Error(error.message);
        },
    });
};

export default useCreateVariantions;
