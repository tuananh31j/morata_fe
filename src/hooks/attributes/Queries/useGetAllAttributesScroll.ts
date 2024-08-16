import { QUERY_KEY } from '~/constants/queryKey';
import useInfiniteScroll from '~/hooks/_common/useInfiniteScroll';
import { attributesServices } from '~/services/attributes.service';

export const useGetAllAttributesScroll = () => {
    const { data, isLoading, Observer, hasNextPage } = useInfiniteScroll({
        queryKey: [QUERY_KEY.ATTRIBUTES_LAZY, QUERY_KEY.ATTRIBUTES],
        queryFn: (pageParam: number) => attributesServices.getAllAttributes({ page: pageParam, limit: '40' }),
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
};
