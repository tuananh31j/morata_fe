import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';
import { IPagination } from '~/types/Api';
import { IProductParams } from '~/types/Product';
import { removeNullKeys } from '~/utils/removeKeyNull';

const useGetProducts = (params: IProductParams, pagination: IPagination) => {
    const removeQueryNull = removeNullKeys(params);
    const query = { ...removeQueryNull, ...pagination };
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params), ...Object.values(pagination)],
        queryFn: () => productService.getAll(query),
    });
};

export default useGetProducts;
