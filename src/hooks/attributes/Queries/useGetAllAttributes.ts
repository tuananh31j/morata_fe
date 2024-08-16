import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { attributesServices } from '~/services/attributes.service';
import { Params } from '~/types/Api';

const useGetAllAtributes = (param: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.ATTRIBUTES, Object.values(param)],
        queryFn: () => attributesServices.getAllAttributes(param),
    });
};

export default useGetAllAtributes;
