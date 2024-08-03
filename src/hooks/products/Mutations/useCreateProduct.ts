import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import showMessage from '~/utils/ShowMessage';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productService.createProduct(data),
        onSuccess: (res) => {
            // setTimeout(() => {
            // queryClient.prefetchQuery({
            //     queryKey: [QUERY_KEY.PRODUCTS],
            //     queryFn: () => productService.getAllProductForAdmin(),
            // });
            // }, 300);
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
            }, 300);
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.PRODUCTS, res.data.productId],
                queryFn: () => productService.getDetailsProductForAdmin(res.data.productId),
            });
        },
        onError(error) {
            showMessage(error.message, 'error');
        },
    });
};

export default useCreateProduct;
