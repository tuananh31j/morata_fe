import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import AuthService from '~/services/auth.service';

export const useVerifyAccount = (token: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['VERIFY_ACCOUNT'],
        mutationFn: () => AuthService.verify({ token }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USERS],
            });
        },
    });
};
