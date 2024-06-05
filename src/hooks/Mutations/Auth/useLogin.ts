import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import useGetMyCart from '~/hooks/Queries/useGetMyCart';
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
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.CART],
                });
            }, 300);
        },
        onError: () => {
            showMessage('Login is not valid!', 'error');
        },
    });
};

export default useLogin;
