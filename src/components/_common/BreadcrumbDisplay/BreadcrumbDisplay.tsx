import { Breadcrumb, ConfigProvider } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';

const BreadcrumbDisplay = ({ titleProduct }: { titleProduct?: string }) => {
    const location = useLocation();

    const breadCrumbView = () => {
        // get current location
        const { pathname } = location;

        // seperate the segments from the URL
        const pathnames = pathname.split('/').filter((item) => item);

        // capitalize the first letter of the each segment
        const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

        return (
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 16,
                    },
                }}
            >
                <div className='breadcrumb-container flex h-[60px] w-full items-center font-semibold'>
                    <Breadcrumb>
                        {pathnames.length > 0 ? (
                            <Breadcrumb.Item className='text-[#212224]'>
                                <Link className='text-[#212224]' to='/'>
                                    Home
                                </Link>
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item className='text-[#212224]'>Home</Breadcrumb.Item>
                        )}

                        {!titleProduct && (
                            <>
                                {pathnames.map((name, index) => {
                                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                                    const isLast = index === pathnames.length - 1;
                                    return isLast ? (
                                        <Breadcrumb.Item key={index} className='text-[#212224]'>
                                            {capatilize(name)}
                                        </Breadcrumb.Item>
                                    ) : (
                                        <Breadcrumb.Item key={index} className='text-[#212224]'>
                                            <Link className='text-[#212224]' to={`${routeTo}`}>
                                                {capatilize(name)}
                                            </Link>
                                        </Breadcrumb.Item>
                                    );
                                })}
                            </>
                        )}
                        {titleProduct && (
                            <>
                                <Breadcrumb.Item>
                                    <Link to={MAIN_ROUTES.PRODUCTS}>Products</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item className='text-[#212224]'>{titleProduct}</Breadcrumb.Item>
                            </>
                        )}
                    </Breadcrumb>
                </div>
            </ConfigProvider>
        );
    };

    return <>{breadCrumbView()}</>;
};

export default BreadcrumbDisplay;
