import { useQueries } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import brandService from '~/services/brand.service';
import categoryService from '~/services/category.service';

const useGetCategoriesAndBrands = () => {
    return useQueries({
        queries: [
            {
                queryKey: [QUERY_KEY.BRANDS],
                queryFn: () => brandService.getAll(),
            },
            {
                queryKey: [QUERY_KEY.CATEGORIES],
                queryFn: () => categoryService.getAll(),
            },
        ],
    });
};

export default useGetCategoriesAndBrands;
