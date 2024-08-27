import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useCreateProductVariant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productService.createProductVariant(data),
        onSuccess: (res) => {
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.PRODUCTS),
            });
        },
    });
};

export default useCreateProductVariant;
