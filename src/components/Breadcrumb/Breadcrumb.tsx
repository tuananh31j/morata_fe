import { Breadcrumb, ConfigProvider } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const BreadCrumb = () => {
    const location = useLocation();

    const breadCrumbView = () => {
        // get current location
        const { pathname } = location;

        //seperate the segments from the URL
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
                            <Breadcrumb.Item>
                                <Link to='/'>Home</Link>
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        )}

                        {pathnames.map((name, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;
                            return isLast ? (
                                <Breadcrumb.Item> {capatilize(name)} </Breadcrumb.Item>
                            ) : (
                                <Breadcrumb.Item>
                                    <Link to={`${routeTo}`}> {capatilize(name)} </Link>
                                </Breadcrumb.Item>
                            );
                        })}
                    </Breadcrumb>
                </div>
            </ConfigProvider>
        );
    };

    return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
