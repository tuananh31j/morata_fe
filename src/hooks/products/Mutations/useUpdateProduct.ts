import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data, productId }: { data: FormData; productId: string }) =>
            productService.updateProduct(data, productId),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.some((key) => typeof key === 'string' && key.includes(QUERY_KEY.PRODUCTS)),
            });
        },
        onError(error) {
            console.log('Update product error', error);
        },
    });
};

export default useUpdateProduct;
