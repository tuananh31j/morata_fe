import { LOCATION_TYPES } from '~/constants/enum';

export interface ILocation {
    _id: string;
    userId: string;
    type: LOCATION_TYPES;
    name: string;
    email: string;
    phone: string;
    address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: number;
        state: string;
    };
}
