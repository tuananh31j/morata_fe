import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import { useTypedSelector } from '~/store/store';
import showMessage from '~/utils/ShowMessage';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const { queryParams, pagination } = useTypedSelector((state) => state.filterProduct);
    return useMutation({
        mutationFn: (data: FormData) => productService.createProduct(data),
        onSuccess: async () => {
            setTimeout(() => {
                queryClient.prefetchQuery({
                    queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(queryParams), ...Object.values(pagination)],
                    queryFn: () => productService.getAll(),
                });
            }, 300);
        },
        onError(error) {
            showMessage(error.message, 'error');
        },
    });
};

export default useCreateProduct;
