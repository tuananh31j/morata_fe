import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useGetDetailProduct = (id: string) => {
    const queryClient = useQueryClient();

    const { data, isSuccess, ...rest } = useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, id],
        queryFn: () => productService.getDetail(id),
    });
    const idProduct = data?.data._id;
    useEffect(() => {
        if (idProduct === id && isSuccess) {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.RELATED],
            });
        }
    }, [id, idProduct, isSuccess, queryClient]);
    return { data, ...rest };
};

export default useGetDetailProduct;
