import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { attributesServices } from '~/services/attributes.service';

const useGetDetailsAttribute = (id: string) => {
    const { data, isSuccess, refetch, ...rest } = useQuery({
        queryKey: [QUERY_KEY.ATTRIBUTES, id],
        queryFn: () => attributesServices.getAttributeDetails(id),
        enabled: !!id,
    });

    return { data, refetch, ...rest, isSuccess };
};

export default useGetDetailsAttribute;
