import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import categoryService from '~/services/category.service';

const useGetDetailCategory = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES, id],
        queryFn: async () => categoryService.getDetail(id),
        enabled: !!id,
    });
};

export default useGetDetailCategory;
