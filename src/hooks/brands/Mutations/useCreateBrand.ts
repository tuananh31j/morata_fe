import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { ADMIN_ROUTES } from '~/constants/router';
import brandService from '~/services/brand.service';
import showMessage from '~/utils/ShowMessage';

export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (payload: { name: string }) => brandService.create(payload),

        onSuccess: async () => {
            queryClient.refetchQueries({
                queryKey: [QUERY_KEY.BRANDS],
            });
            showMessage('Brand created successfully!', 'success');
            navigate(ADMIN_ROUTES.BRANDS, { replace: true });
        },
    });
};
