import { Navigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';

const RedirectToProductList = () => {
    return <Navigate to={`${ADMIN_ROUTES.PRODUCTS_LIST}`} />;
};

export default RedirectToProductList;
