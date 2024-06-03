import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '~/services/auth.service';
import { login } from '~/store/slice/authSlice';
import { LoginFormData } from '~/types/Schemas/Auth';
import { setAccessToken, setUserInfo } from '~/utils/api/apiHelper';
import showMessage from '~/utils/ShowMessage';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (body: LoginFormData) => AuthService.login(body),
        onSuccess: (data) => {
            navigator('/');
            showMessage('Login is successfuly!', 'success');
            dispatch(login(data.data.data.user));
            setUserInfo(data.data.data.user);
            setAccessToken(data.data.data.accessToken);
            queryClient.invalidateQueries({
                queryKey: ['CART'],
            });
        },
        onError: () => {
            showMessage('Login is not valid!', 'error');
        },
    });
};

export default useLogin;
