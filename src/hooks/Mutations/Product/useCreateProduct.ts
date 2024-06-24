import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useCreateProduct = () => {
    const useClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData) => productService.createProduct(data),
        onSuccess(res) {
            console.log('OK', res);
            useClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useCreateProduct;
