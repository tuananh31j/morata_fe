import { useMutation } from '@tanstack/react-query';
import AuthService from '~/services/auth.service';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

export const useSendVerify = () => {
    return useMutation({
        mutationKey: ['SEND_VERIFY'],
        mutationFn: (body: { email: string }) => AuthService.sendVerify(body),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
            showMessage(data.data.message, 'success');
        },
        onError: (error: IErrorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
