import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import categoryService from '~/services/category.service';
import { ICategoryFormData } from '~/types/Category';

export const useMutationUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.CATEGORIES.UPDATE],
        mutationFn: ({ id, payload }: { id: string; payload: ICategoryFormData }) =>
            categoryService.updateCategory(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORIES.LIST] });
        },
    });
};
