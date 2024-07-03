import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';

const useGetMyCart = (id?: string) => {
    const { data, ...rest } = useQuery({
        queryKey: [QUERY_KEY.CART],
        queryFn: () => cartService.getItemCart(id),
        retry: 0,
        enabled: !!id,
    });
    const responsePayloadCheckout = data?.data.items.map((item) => ({
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        image: item.productId.thumbnail,
    }));

    return { data, ...rest, responsePayloadCheckout };
};

export default useGetMyCart;
