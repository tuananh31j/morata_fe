import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import categoryService from '~/services/category.service';
import { ICategory } from '~/types/Category';

export const useMutationCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [QUERY_KEY.CATEGORIES.CREATE],
        mutationFn: (payload: ICategory) => categoryService.createCategory(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORIES.LIST] });
        },
    });
};
