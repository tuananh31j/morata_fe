import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import categoryService from '~/services/category.service';
import { ICategoryFormData } from '~/types/Category';

export const useMutationCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.CATEGORIES.CREATE],
        mutationFn: (payload: ICategoryFormData) => categoryService.createCategory(payload),

        onSuccess: async () => {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.CATEGORIES.LIST],
                queryFn: () => categoryService.getAll(),
            });
        },
    });
};
