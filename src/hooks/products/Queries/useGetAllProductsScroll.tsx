import { QUERY_KEY } from '~/constants/queryKey';
import useInfiniteScroll from '~/hooks/_common/useInfiniteScroll';
import productService from '~/services/product.service';

export default function useGetAllProductsScroll() {
    const { data, isLoading, Observer, hasNextPage } = useInfiniteScroll({
        queryKey: [QUERY_KEY.PRODUCTS_LAZY, QUERY_KEY.PRODUCTS],
        queryFn: (pageParam: number) => productService.getAllProducts({ page: pageParam }),
        getNextPageParamFn: (lastPage) => {
            return lastPage.data.totalPages > lastPage.data.page ? lastPage.data.page + 1 : undefined;
        },
    });

    return {
        Observer,
        data,
        isLoading,
        hasNextPage,
    };
}
