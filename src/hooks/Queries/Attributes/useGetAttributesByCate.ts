import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { attributesServices } from '~/services/attributes.service';

export const useGetAllAtributes = (cateId: string) => {
    const { data, isSuccess, refetch, ...rest } = useQuery({
        queryKey: [QUERY_KEY.ATTRIBUTES, cateId],
        queryFn: () => attributesServices.getAllAttributesByCate(cateId),
    });

    return { data, refetch, ...rest, isSuccess };
};
