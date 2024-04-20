import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';

const PrivateLayout = () => {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default PrivateLayout;
