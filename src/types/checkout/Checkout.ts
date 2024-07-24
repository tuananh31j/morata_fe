import { PaymentMethod } from '../../constants/enum';

export type IPayloadItemsOrder =
    | {
          name: string;
          price: number;
          quantity: number;
          image: string;
      }
    | undefined;

export type ICheckoutCash = {
    receiverInfo: {
        name: string | undefined;
        email: string | undefined;
        phone: string | undefined;
    };
    shippingAddress: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
    };
    items: IPayloadItemsOrder[] | undefined;
    totalPrice: number;
    paymentMethod?: PaymentMethod;
};

export type ICheckoutForm = {
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
};
