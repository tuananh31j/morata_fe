import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';

const useGetMyCart = (id?: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.CART],
        queryFn: () => cartService.getItemCart(id),
        retry: 0,
        enabled: !!id,
    });
};

export default useGetMyCart;
