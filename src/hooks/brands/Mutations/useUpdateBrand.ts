import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import brandService from '~/services/brand.service';
import { IBrand } from '~/types/Brand';
import showMessage from '~/utils/ShowMessage';

export const useUpdateBrand = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: IBrand) => brandService.update(payload),
        onSuccess: async () => {
            queryClient.refetchQueries({
                queryKey: [QUERY_KEY.BRANDS],
            });
            showMessage('Brand created successfully!', 'success');
            navigate(ADMIN_ROUTES.BRANDS, { replace: true });
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
