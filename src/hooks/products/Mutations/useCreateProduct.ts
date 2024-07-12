import { useMutation } from '@tanstack/react-query';
import productService from '~/services/product.service';
import showMessage from '~/utils/ShowMessage';

const useCreateProduct = () => {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => productService.createProduct(data),
        onSuccess: async (res) => {
            // queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
            // setTimeout( () => {
            //      queryClient.prefetchQuery({
            //         queryKey: [QUERY_KEY.PRODUCTS],
            //         queryFn: () => productService.getAll(),
            //     });
            // },2000);
        },
        onError(error) {
            showMessage(error.message, 'error');
        },
    });
};

export default useCreateProduct;
