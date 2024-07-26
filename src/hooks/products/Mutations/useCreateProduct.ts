import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import { useTypedSelector } from '~/store/store';
import showMessage from '~/utils/ShowMessage';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productService.createProduct(data),
        onSuccess: async () => {
            // setTimeout(() => {
            //     queryClient.prefetchQuery({
            //         queryKey: [QUERY_KEY.PRODUCTS],
            //         queryFn: () => productService.getAll(),
            //     });
            // }, 300);
        },
        onError(error) {
            showMessage(error.message, 'error');
        },
    });
};

export default useCreateProduct;
