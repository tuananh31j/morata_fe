import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import showMessage from '~/utils/ShowMessage';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productService.createProduct(data),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.some((key) => {
                        console.log(
                            key,
                            typeof key === 'string' && key.includes(QUERY_KEY.PRODUCTS),
                            '111111111111111111111111111'
                        );
                        return typeof key === 'string' && key.includes(QUERY_KEY.PRODUCTS);
                    }),
            });
        },
        onError(error) {
            showMessage(error.message, 'error');
        },
    });
};

export default useCreateProduct;
