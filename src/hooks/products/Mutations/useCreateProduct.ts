import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import { RootState } from '~/store/store';
import showMessage from '~/utils/ShowMessage';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const params = useSelector((state: RootState) => state.AdminTableFilterProduct.params);
    return useMutation({
        mutationFn: (data: FormData) => productService.createProduct(data),
        onSuccess: async () => {
            setTimeout(() => {
                queryClient.prefetchQuery({
                    queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params)],
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
