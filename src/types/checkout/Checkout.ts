export type IPayloadItemsOrder =
    | {
          name: string;
          price: number;
          quantity: number;
          image: string;
      }
    | undefined;

export type ICheckoutCash = {
    customerInfo: {
        name: string | undefined;
        email: string | undefined;
        phone: string | undefined;
    };
    shippingAddress: any;
    items: IPayloadItemsOrder[] | undefined;
    totalPrice: number;
    paymentMethod?: string;
};

export type ICheckoutForm = {
    phone: string;
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
};
