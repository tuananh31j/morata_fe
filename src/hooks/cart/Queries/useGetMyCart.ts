import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { useTypedSelector } from '~/store/store';

const useGetMyCart = (id?: string) => {
    const user = useTypedSelector((state) => state.authReducer.user);
    const { data, ...rest } = useQuery({
        queryKey: [QUERY_KEY.CART],
        queryFn: () => cartService.getItemCart(user?._id),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?._id,
    });

    const responsePayloadCheckout = data?.data?.items.map((item) => ({
        name: item?.productVariation?.productId?.name,
        price: item?.productVariation?.price,
        quantity: item?.quantity,
        image: item?.productVariation?.image,
        productId: item?.productVariation?.productId?._id,
        productVariationId: item?.productVariation?._id,
    }));

    return { data, ...rest, responsePayloadCheckout };
};

export default useGetMyCart;
