import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthService from '~/services/auth.service';
import showMessage from '~/utils/ShowMessage';

const useRegister = () => {
    const navigator = useNavigate();

    return useMutation({
        mutationKey: ['register'],
        mutationFn: (body: { username: string; email: string; password: string }) => AuthService.register(body),
        onSuccess: () => {
            showMessage('successful authentication!', 'success');
            navigator('/auth/login');
        },
    });
};

export default useRegister;
