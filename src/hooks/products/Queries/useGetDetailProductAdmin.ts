import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useGetDetailProductAdmin = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, id],
        queryFn: () => productService.getDetailsProductForAdmin(id),
        enabled: !!id,
    });
};

export default useGetDetailProductAdmin;
