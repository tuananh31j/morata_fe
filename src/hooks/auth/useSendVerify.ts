import { useMutation } from '@tanstack/react-query';
import AuthService from '~/services/auth.service';
import showMessage from '~/utils/ShowMessage';

export const useSendVerify = () => {
    return useMutation({
        mutationKey: ['SEND_VERIFY'],
        mutationFn: (body: { email: string }) => AuthService.sendVerify(body),
        onSuccess: (data: any) => {
            showMessage(data.data.message, 'success');
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
