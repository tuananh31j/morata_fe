import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import locationService from '~/services/location.service';

const useGetAllLocationByUser = () => {
    return useQuery({
        queryKey: [QUERY_KEY.LOCATION],
        queryFn: () => locationService.getAllLocationByUser(),
    });
};

export default useGetAllLocationByUser;
