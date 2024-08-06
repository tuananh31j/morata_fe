import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useCreateProductVariant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productService.createProductVariant(data),
        onSuccess: (res) => {
            queryClient.resetQueries({
                predicate: (query) => (query.queryKey[0] as string) === QUERY_KEY.PRODUCTS,
            });
        },
        onError(error) {
            console.log('Update product error', error);
        },
    });
};

export default useCreateProductVariant;
