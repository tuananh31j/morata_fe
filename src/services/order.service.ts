import instance from '~/utils/api/axiosIntance';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ORDER_ENDPOINT } from '~/constants/endpoint';
import { IOrder } from '~/types/Order';

export type IMyOrder = IAxiosResponse<
    Pick<IOrder, '_id' | 'orderStatus' | 'createdAt' | 'totalPrice' | 'paymentMethod'>[]
>;

const orderService = {
    myOrder() {
        return instance.get<IAxiosResponse<IMyOrder[]>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },
    cancelOrder(id: string) {
        return instance.post<void, { orderId: string }>(`${ORDER_ENDPOINT.MY_ORDERS}`, {
            orderId: id,
        });
    },
    orderDetails(id: string) {
        return instance.get<IAxiosResponse<Omit<IOrder, '_id'>>>(`${ORDER_ENDPOINT.ROOT}/${id}`);
    },
};

export default orderService;
