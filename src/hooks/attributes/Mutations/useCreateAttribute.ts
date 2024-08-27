import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import { attributesServices } from '~/services/attributes.service';
import { IAttributeFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';

export const useMutationCreateAttribute = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: [QUERY_KEY.ATTRIBUTES],
        mutationFn: (payload: IAttributeFormData) => attributesServices.createAttribute(payload),

        onSuccess: () => {
            queryClient.resetQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.ATTRIBUTES),
            });
            showMessage('Thêm mới thuộc tính thành công!', 'success');
            navigate(ADMIN_ROUTES.ATTRIBUTES, { replace: true });
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
