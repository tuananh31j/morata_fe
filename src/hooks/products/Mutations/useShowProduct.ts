import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import showMessage from '~/utils/ShowMessage';

const useShowProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => productService.showProduct(id),
        onSuccess() {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.includes(QUERY_KEY.PRODUCTS) || query.queryKey.includes(QUERY_KEY.CART),
            });
            showMessage('Đã hiện sản phẩm!', 'info');
        },
        onError(error) {
            console.log('error', error);
        },
    });
};

export default useShowProduct;
