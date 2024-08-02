import { Fragment } from 'react/jsx-runtime';
import HeaderManageOrder from './HeaderManageOrder';
import OrderTable from './OrderTable';
import useGetAllOrders from '~/hooks/orders/Queries/useGetAllOrders';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const ManageOrder = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const queryClient = useQueryClient();
    const { data } = useGetAllOrders({ page: currentPage });
    const ordersList = data?.data?.orders;
    const totalDocs = data?.data?.totalDocs;
    const totalPages = data?.data?.totalPages;

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ['orders'],
        });
    }, [currentPage]);

    return (
        <Fragment>
            <HeaderManageOrder />
            <OrderTable
                ordersList={ordersList}
                totalDocs={totalDocs}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </Fragment>
    );
};
export default ManageOrder;
