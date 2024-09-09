import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { useSendVerify } from '~/hooks/auth/useSendVerify';
import AuthService from '~/services/auth.service';
import { IErrorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

const useRegister = () => {
    const navigator = useNavigate();
    const { mutate } = useSendVerify();
    return useMutation({
        mutationKey: ['register'],
        mutationFn: (body: { name: string; email: string; password: string }) => AuthService.register(body),
        onSuccess: (data) => {
            navigator(MAIN_ROUTES.CHECKEMAIL);
            mutate({ email: data.data.data.email });
        },
        onError: (error: IErrorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useRegister;
