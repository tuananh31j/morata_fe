import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { attributesServices } from '~/services/attributes.service';
import { IAttributeFormData } from '~/types/Category';

export const useMutationCreateAttribute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.ATTRIBUTES],
        mutationFn: (payload: IAttributeFormData) => attributesServices.createAttribute(payload),

        onSuccess: async () => {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.ATTRIBUTES],
                queryFn: () => attributesServices.getAllAttributes(),
            });
        },
    });
};
