import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import showMessage from '~/utils/ShowMessage';

const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => productService.createProduct(data),
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
        },
        onError(error) {
            console.log(error);
            showMessage(error.message, 'error');
        },
    });
};

export default useCreateProduct;
