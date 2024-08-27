import instance from '~/utils/api/axiosIntance';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { LOCATION_ENDPOINT } from '~/constants/endpoint';
import { ILocation } from '~/types/Location';

const locationService = {
    getAllLocationByUser() {
        return instance.get<IAxiosResponse<ILocation[]>>(`${LOCATION_ENDPOINT.USER}`);
    },
    updateLocation(payload: Partial<ILocation>) {
        return instance.patch<IAxiosResponse<null>>(`${LOCATION_ENDPOINT.ROOT}/${payload._id}`, payload);
    },
    addLocation(payload: ILocation) {
        const { _id, ...rest } = payload;
        return instance.post<IAxiosResponse<null>>(`${LOCATION_ENDPOINT.ROOT}`, rest);
    },
    deleteLocation(id: string) {
        return instance.delete<IAxiosResponse<null>>(`${LOCATION_ENDPOINT.ROOT}/${id}`);
    },
};

export default locationService;
