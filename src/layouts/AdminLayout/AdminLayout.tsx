import { Outlet } from 'react-router-dom';
import AdminSidebar from '~/layouts/_components/AdminSidebar';
import AdminNavbar from '../_components/AdminNav/AdminNav';

const AdminLayout = () => {
    return (
        <>
            {/* lignt 5e72e4 */}
            {/* dark 051139 */}
            <div className='fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[#caccd5] transition-colors duration-300 dark:bg-[#5e6168]'></div>
            <AdminSidebar />
            <main className='relative h-full max-h-screen rounded-xl transition-all duration-200 ease-in-out xl:ml-[13rem]'>
                <AdminNavbar />
                <div className='mx-4 mt-[7.5rem] sm:mt-[6.75rem]'>
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default AdminLayout;
