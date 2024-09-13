import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import productService from '~/services/product.service';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ data, productId }: { data: FormData; productId: string }) =>
            productService.updateProduct(data, productId),
        onSuccess: (res) => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.includes(QUERY_KEY.PRODUCTS) || query.queryKey.includes(QUERY_KEY.CART),
            });
            showMessage('Cập nhật sản phẩm thành công!', 'success');
            navigate(ADMIN_ROUTES.PRODUCTS);
        },
        onError: (error: IErrorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useUpdateProduct;
