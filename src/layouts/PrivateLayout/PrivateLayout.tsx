import { Outlet } from 'react-router-dom';
import AdminSidebar from '~/layouts/_components/AdminSidebar';
import AdminNavbar from '../_components/AdminNav/AdminNav';

const PrivateLayout = () => {
    return (
        <div>
            {/* dark:bg-[#051139] */}
            {/* light: #5e72e4 */}
            <div className='fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[#5074D6] transition-colors duration-300 '></div>
            <AdminSidebar />
            <main className='relative h-full max-h-screen rounded-xl transition-all duration-200 ease-in-out xl:ml-[17rem]'>
                <AdminNavbar />
                <Outlet />
            </main>
        </div>
    );
};

export default PrivateLayout;
