import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import productService from '~/services/product.service';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: FormData) => productService.createProduct(data),
        onSuccess: (res) => {
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.PRODUCTS),
            });
            showMessage('Thêm mới sản phẩm thành công!', 'success');
            navigate(ADMIN_ROUTES.PRODUCTS);
        },
        onError: (error: IErrorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useCreateProduct;
