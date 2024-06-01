import { Outlet, useLocation, useParams } from 'react-router-dom';
import BackToTop from '~/components/_common/BackToTop';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';
import Footer from '~/layouts/_components/Footer';
import Header from '~/layouts/_components/Header';

const MainLayout = () => {
    const location = useLocation();
    const { id } = useParams();
    const isHomePage = location.pathname === '/';
    const isProductDetailPage = location.pathname === `/products/${id}`;
    return (
        <div className='bg-[#f6f7f9]'>
            <Header />
            <div className='mx-3 min-h-[80vh] lg:mx-4'>
                {!isHomePage && !isProductDetailPage && <BreadcrumbDisplay />}
                <Outlet />
            </div>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default MainLayout;
