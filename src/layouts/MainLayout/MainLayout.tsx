import { Outlet, useLocation, useParams } from 'react-router-dom';
import BackToTop from '~/components/_common/BackToTop';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';
import { MAIN_ROUTES } from '~/constants/router';
import useMessage from '~/hooks/_common/useMessage';
import Footer from '~/layouts/_components/Main/Footer';
import Header from '~/layouts/_components/Main/Header';

const MainLayout = () => {
    const { contextHolder } = useMessage();
    const location = useLocation();
    const { id } = useParams();
    const { token } = useParams();
    const isHomePage = location.pathname === '/';
    const isProductDetailPage = location.pathname === `${MAIN_ROUTES.PRODUCTS}/${id}`;
    const isVerifyAccountPage = location.pathname === `/verifyAccount/${token}`;
    const isResetPasswordPage = location.pathname === `/resetPassword/${token}`;
    const isOrderDetailPage = location.pathname === `/my-orders/${id}`;
    return (
        <div className='bg-[#f6f7f9]'>
            <Header />
            <main className='mx-3 min-h-[80vh] lg:mx-4'>
                {!isHomePage &&
                    !isProductDetailPage &&
                    !isVerifyAccountPage &&
                    !isResetPasswordPage &&
                    !isOrderDetailPage && <BreadcrumbDisplay />}
                <Outlet />
            </main>
            <Footer />
            <BackToTop />
            {contextHolder}
        </div>
    );
};

export default MainLayout;
