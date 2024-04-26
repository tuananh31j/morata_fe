import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ButtonBackToTop from '~/components/ButtonBackToTop';
import BreadcrumbDisplay from '~/components/BreadcrumbDisplay';

const MainLayout = () => {
    return (
        <div className='bg-[#f6f7f9]'>
            <Header />
            <div className='mx-1 lg:mx-4'>
                <BreadcrumbDisplay />
                <Outlet />
            </div>

            <Footer />
            <ButtonBackToTop />
        </div>
    );
};

export default MainLayout;
