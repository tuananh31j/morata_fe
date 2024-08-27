import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import brandService from '~/services/brand.service';
import { Params } from '~/types/Api';

const useGetAllBrands = (params?: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.BRANDS, ...Object.values(params || {})],
        queryFn: () => brandService.getAll(params),
    });
};

export default useGetAllBrands;
