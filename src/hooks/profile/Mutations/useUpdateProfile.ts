import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import userService from '~/services/user.service';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

export const useMutationUpdateProfle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.USERS],
        mutationFn: (payload: FormData) => userService.updateProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS_PROFILE, QUERY_KEY.USERS] });

            showMessage('Cập nhật thông tin cá nhân thành công!', 'success');
        },
        onError: (error: IErrorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
