import { LoadingOutlined } from '@ant-design/icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollProps<T> {
    queryKey: string[];
    queryFn: (pageParam: number) => Promise<T>;
    getNextPageParamFn: (lastPage: T, allPages: T[]) => number | undefined;
    initialPageParam?: number;
}

const useInfiniteScroll = <T,>({
    queryKey,
    queryFn,
    getNextPageParamFn,
    initialPageParam = 1,
}: InfiniteScrollProps<T>) => {
    const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam = initialPageParam }) => queryFn(pageParam),
        getNextPageParam: getNextPageParamFn,
        initialPageParam,
    });

    const Observer = () => {
        const { ref, inView } = useInView({ threshold: 1 });
        useEffect(() => {
            if (inView && hasNextPage) {
                fetchNextPage();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [inView, hasNextPage, fetchNextPage]);

        if (!hasNextPage || !data) return null;
        return (
            <div className='my-10 flex flex-col justify-center' ref={ref}>
                {isLoading || isFetchingNextPage ? (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                ) : null}
            </div>
        );
    };

    return {
        Observer,
        data,
        isLoading,
        hasNextPage,
    };
};

export default useInfiniteScroll;
