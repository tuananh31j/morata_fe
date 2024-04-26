import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ButtonBackToTop from '~/components/ButtonBackToTop';
import BreadcrumbDisplay from '~/components/BreadcrumbDisplay';

const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <div className='bg-[#f6f7f9]'>
            <Header />
            <div className='mx-1 lg:mx-4'>
                {!isHomePage && <BreadcrumbDisplay />}
                <Outlet />
            </div>

            <Footer />
            <ButtonBackToTop />
        </div>
    );
};

export default MainLayout;
