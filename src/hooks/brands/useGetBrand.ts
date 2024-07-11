import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import brandService from '~/services/brand.service';

const useGetBrand = (brandId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.BRANDS, brandId],
        queryFn: () => brandService.getBrand(brandId),
    });
};

export default useGetBrand;
