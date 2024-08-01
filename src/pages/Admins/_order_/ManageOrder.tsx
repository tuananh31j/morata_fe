import { Fragment } from 'react/jsx-runtime';
import HeaderManageOrder from './HeaderManageOrder';
import OrderTable from './OrderTable';
import useGetAllOrders from '~/hooks/orders/Queries/useGetAllOrders';

const ManageOrder = () => {
    const { data } = useGetAllOrders();
    console.log(data);
    return (
        <Fragment>
            <HeaderManageOrder />
            <OrderTable />
        </Fragment>
    );
};
export default ManageOrder;
