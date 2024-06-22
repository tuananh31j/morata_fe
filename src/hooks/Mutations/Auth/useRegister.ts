import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import AuthService from '~/services/auth.service';
import showMessage from '~/utils/ShowMessage';

const useRegister = () => {
    const navigator = useNavigate();

    return useMutation({
        mutationKey: ['register'],
        mutationFn: (body: { username: string; email: string; password: string }) => AuthService.register(body),
        onSuccess: () => {
            showMessage('successful authentication!', 'success');
            navigator(MAIN_ROUTES.LOGIN);
        },
    });
};

export default useRegister;
