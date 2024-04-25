import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div className='bg-[#f6f7f9]'>
            <Header />
            <div className='mx-1 lg:mx-4'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
