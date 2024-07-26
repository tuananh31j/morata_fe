import { Navigate } from 'react-router-dom';

const RedirectToOrderList = () => {
    return <Navigate to='/admin/orders/list' />;
};

export default RedirectToOrderList;
