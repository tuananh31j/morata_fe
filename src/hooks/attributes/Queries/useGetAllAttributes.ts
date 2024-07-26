import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { attributesServices } from '~/services/attributes.service';

export const useGetAllAtributesNew = () => {
    const { data, isSuccess, refetch, ...rest } = useQuery({
        queryKey: [QUERY_KEY.ATTRIBUTES],
        queryFn: () => attributesServices.getAllAttributes(),
    });

    return { data, refetch, ...rest, isSuccess };
};
