import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import AuthService from '~/services/auth.service';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

const useSendResetPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['SEND_RESET_PASSWORD'],
        mutationFn: (body: { email: string }) => AuthService.sendResetPassword(body),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
            navigate(MAIN_ROUTES.CHECKEMAIL);
            showMessage(data.data.message, 'success', 5000);
        },
        onError: (error: IErrorResponse) => {},
    });
};

export default useSendResetPassword;
