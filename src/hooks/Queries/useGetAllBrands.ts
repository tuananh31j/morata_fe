import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import brandService from '~/services/brand.service';

const useGetAllBrands = () => {
    return useQuery({
        queryKey: [QUERY_KEY.BRANDS],
        queryFn: () => brandService.getAll(),
    });
};

export default useGetAllBrands;
