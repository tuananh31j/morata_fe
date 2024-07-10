import instance from '~/utils/api/axiosIntance';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ORDER_ENDPOINT } from '~/constants/endpoint';
import { IOrderResponse, IOrderDetails, IOrderParams } from '~/types/Order';
import { OrderStatus } from '~/types/enum';

const orderService = {
    myOrder() {
        return instance.get<IAxiosResponse<IOrderResponse>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },
    getAllOrders(params?: IOrderParams) {
        console.log('🚀 ~ getAllOrders ~ params:', params);
        return instance.get<IAxiosResponse<IOrderResponse>>(`${ORDER_ENDPOINT.ROOT}`, {
            params,
        });
    },
    cancelOrder(body: { orderId: string; description?: string }) {
        return instance.patch<void, { orderId: string; description?: string }>(`${ORDER_ENDPOINT.CANCELED}`, body);
    },
    confirmOrder(id: string) {
        return instance.patch<void, string>(`${ORDER_ENDPOINT.ROOT}/confirm`, {
            orderId: id,
        });
    },
    orderDetails(id: string) {
        return instance.get<IAxiosResponse<IOrderDetails>>(`${ORDER_ENDPOINT.ROOT}/${id}`);
    },
    orderStatus() {
        return instance.get<IAxiosResponse<OrderStatus[]>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },
};

export default orderService;
