import { Outlet } from 'react-router-dom';
import AdminSidebar from '~/layouts/_components/AdminSidebar';

const PrivateLayout = () => {
    return (
        <>
            {/* lignt 5e72e4 */}
            {/* dark 051139 */}
            <div className='fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[#5e72e4] transition-colors duration-300 dark:bg-[#051139]'></div>
            <AdminSidebar />
            <main className='relative h-full max-h-screen rounded-xl transition-all duration-200 ease-in-out xl:ml-[17rem]'>
                <Outlet />
            </main>
        </>
    );
};

export default PrivateLayout;
