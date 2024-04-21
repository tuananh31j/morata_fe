import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div className='bg-[#f6f7f9]'>
            <Header />
            <div className='2xl mx-2 lg:mx-16'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
