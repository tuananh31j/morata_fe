import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import locationService from '~/services/location.service';
import showMessage from '~/utils/ShowMessage';

const useDeleteLocation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => locationService.deleteLocation(id),
        onSuccess: () => {
            queryClient.resetQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.LOCATION),
            });
        },
        onError(error) {
            showMessage(error.message, 'error');
        },
    });
};

export default useDeleteLocation;
