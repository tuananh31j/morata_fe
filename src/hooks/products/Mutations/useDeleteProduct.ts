import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => productService.deleteProduct(id),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CART] });
        },
        onError(error) {
            console.log('error', error);
        },
    });
};

export default useDeleteProduct;
