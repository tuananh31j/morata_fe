import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import locationService from '~/services/location.service';
import { ILocation } from '~/types/Location';
import showMessage from '~/utils/ShowMessage';

const useUpdateLocation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ILocation) => locationService.updateLocation(data),
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

export default useUpdateLocation;
