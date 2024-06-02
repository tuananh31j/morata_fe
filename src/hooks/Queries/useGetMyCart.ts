import { useQuery } from '@tanstack/react-query';
import { cartService } from '~/services/cart.service';

const useGetMyCart = (id?: string) => {
    return useQuery({
        queryKey: ['CART'],
        queryFn: () => cartService.getItemCart(id),
        retry: 1,
    });
};

export default useGetMyCart;
