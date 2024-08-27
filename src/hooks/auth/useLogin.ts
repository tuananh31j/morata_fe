import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { useSendVerify } from '~/hooks/auth/useSendVerify';
import AuthService from '~/services/auth.service';
import { login } from '~/store/slice/authSlice';
import { LoginFormData } from '~/types/Schemas/Auth';
import { setAccessToken, setUserInfo } from '~/utils/api/apiHelper';
import showMessage from '~/utils/ShowMessage';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { mutate } = useSendVerify();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (body: LoginFormData) => AuthService.login(body),
        onSuccess: (data) => {
            navigator('/');
            showMessage('Đăng nhập thành công!', 'success');
            dispatch(login(data.data.data.user));
            setUserInfo(data.data.data.user);
            setAccessToken(data.data.data.accessToken);
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEY.CART],
                });
            }, 300);
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.USERS_PROFILE),
            });
        },
        onError: (error: any) => {
            if (error.response.data.data) {
                showMessage(error.response.data.message, 'info');
                mutate({ email: error.response.data.data });
                navigate('/checkEmail');
            } else {
                showMessage(error.response.data.message, 'error');
            }
        },
    });
};

export default useLogin;
