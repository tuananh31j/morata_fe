import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import BackToTop from '~/components/BackToTop';
import BreadcrumbDisplay from '~/components/BreadcrumbDisplay';

const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <div className='bg__color'>
            <Header />
            <div className='mx-3 min-h-[80vh] lg:mx-4'>
                {!isHomePage && <BreadcrumbDisplay />}
                <Outlet />
            </div>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default MainLayout;
