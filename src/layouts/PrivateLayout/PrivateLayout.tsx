import { Outlet } from 'react-router-dom';
import AdminSidebar from '~/layouts/_components/AdminSidebar';

const PrivateLayout = () => {
    return (
        <div>
            <AdminSidebar />
            <Outlet />
        </div>
    );
};

export default PrivateLayout;
