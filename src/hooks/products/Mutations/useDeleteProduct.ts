import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => productService.deleteProduct(id),
        onSuccess() {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.some((key) => typeof key === 'string' && key.includes(QUERY_KEY.PRODUCTS)),
            });
        },
        onError(error) {
            console.log('error', error);
        },
    });
};

export default useDeleteProduct;
