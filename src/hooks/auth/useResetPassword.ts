import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthService from '~/services/auth.service';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

const useResetPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['RESET_PASSWORD'],
        mutationFn: (body: { token: string; password: string }) => AuthService.resetPassword(body),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
            navigate('/login');
            showMessage(data.data.message, 'success', 5000);
        },
        onError: (error: IErrorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useResetPassword;
