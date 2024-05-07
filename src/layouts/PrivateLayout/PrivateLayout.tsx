import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';

const PrivateLayout = () => {
    return (
        <div>
            <AdminSidebar />
            <Outlet />
        </div>
    );
};

export default PrivateLayout;
