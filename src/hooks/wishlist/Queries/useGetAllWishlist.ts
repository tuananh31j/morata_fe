import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import wishlistService from '~/services/wishlist.service';

const useGetAllWishlist = (params: object) => {
    return useQuery({
        queryKey: [QUERY_KEY.WISHLIST.LIST, ...Object.values(params), ...Object.keys(params)],
        queryFn: () => wishlistService.getAllWishlist(params),
    });
};

export default useGetAllWishlist;
