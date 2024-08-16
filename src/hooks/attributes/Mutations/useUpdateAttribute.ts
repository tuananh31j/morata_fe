import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { attributesServices } from '~/services/attributes.service';
import { IAttributeFormData } from '~/types/Category';

const useUpdateAttribute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.ATTRIBUTES],
        mutationFn: (payload: IAttributeFormData) => attributesServices.updateAttibute(payload),

        onSuccess: () => {
            queryClient.resetQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.ATTRIBUTES),
            });
        },
    });
};

export default useUpdateAttribute;
