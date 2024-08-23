import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import { attributesServices } from '~/services/attributes.service';
import { IAttributeFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';

const useUpdateAttribute = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.ATTRIBUTES],
        mutationFn: (payload: IAttributeFormData) => attributesServices.updateAttibute(payload),

        onSuccess: () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.CATEGORIES, QUERY_KEY.PRODUCTS, QUERY_KEY.ATTRIBUTES].includes(element as string)
                    ),
            });
            showMessage('Đã cập nhật thông tin thuộc tính!', 'success');
            navigate(ADMIN_ROUTES.ATTRIBUTES, { replace: true });
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useUpdateAttribute;
