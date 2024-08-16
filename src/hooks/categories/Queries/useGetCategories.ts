import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import categoryService from '~/services/category.service';

const useGetCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES],
        queryFn: () => categoryService.getAll(),
    });
};

export default useGetCategories;
