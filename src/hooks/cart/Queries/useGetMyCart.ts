import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';

const useGetMyCart = (id?: string) => {
    const { data, ...rest } = useQuery({
        queryKey: [QUERY_KEY.CART],
        queryFn: () => cartService.getItemCart(id),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
    });
    const responsePayloadCheckout = data?.data.items.map((item) => ({
        name: item.productVariation.productId.name,
        price: item.productVariation.price,
        quantity: item.quantity,
        image: item.productVariation.image,
        productId: item.productVariation.productId._id,
    }));

    return { data, ...rest, responsePayloadCheckout };
};

export default useGetMyCart;
