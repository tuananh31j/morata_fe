import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { logout } from '~/store/slice/authSlice';
import showMessage from '~/utils/ShowMessage';

const useLogout = () => {
    const queryClient = useQueryClient();

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const handleLogout = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.CART],
        });
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        dispatch(logout());
        navigator('/');
        showMessage('Logged out!', 'info');
    };
    return handleLogout;
};

export default useLogout;
