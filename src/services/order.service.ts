import instance from '~/utils/api/axiosIntance';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ORDER_ENDPOINT } from '~/constants/endpoint';
import { IAllOrder, IOrder } from '~/types/Order';
import { OrderStatus } from '~/types/enum';

export type IMyOrder = IAxiosResponse<
    Pick<IOrder, '_id' | 'orderStatus' | 'createdAt' | 'totalPrice' | 'paymentMethod'>[]
>;

const orderService = {
    myOrder() {
        return instance.get<IAxiosResponse<IMyOrder[]>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },
    getAllOrders() {
        return instance.get<IAxiosResponse<IAllOrder[]>>(`${ORDER_ENDPOINT.ROOT}`);
    },
    cancelOrder(id: string) {
        return instance.patch<void, { orderId: string }>(`${ORDER_ENDPOINT.CANCELED}`, {
            orderId: id,
        });
    },
    confirmOrder(id: string) {
        return instance.patch<void, string>(`${ORDER_ENDPOINT.ROOT}/confirm`, {
            orderId: id,
        });
    },
    orderDetails(id: string) {
        return instance.get<IAxiosResponse<Omit<IOrder, '_id'>>>(`${ORDER_ENDPOINT.ROOT}/${id}`);
    },
    orderStatus() {
        return instance.get<IAxiosResponse<OrderStatus[]>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },
};

export default orderService;
