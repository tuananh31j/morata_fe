import { Outlet, useLocation, useParams } from 'react-router-dom';
import BackToTop from '~/components/_common/BackToTop';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';
import useMessage from '~/hooks/_common/useMessage';
import Footer from '~/layouts/_components/Footer';
import Header from '~/layouts/_components/Header';

const MainLayout = () => {
    const { contextHolder } = useMessage();
    const location = useLocation();
    const { id } = useParams();
    const isHomePage = location.pathname === '/';
    const isProductDetailPage = location.pathname === `/products/${id}`;
    return (
        <div className='bg-[#f6f7f9]'>
            <Header />
            <main className='mx-3 min-h-[80vh] lg:mx-4'>
                {!isHomePage && !isProductDetailPage && <BreadcrumbDisplay />}
                <Outlet />
            </main>
            <Footer />
            <BackToTop />
            {contextHolder}
        </div>
    );
};

export default MainLayout;
