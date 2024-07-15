import { Breadcrumb, ConfigProvider } from 'antd';
import { useLocation } from 'react-router-dom';

const BreadcrumbDisplay = ({ titleProduct }: { titleProduct?: string }) => {
    const location = useLocation();

    const breadCrumbView = () => {
        // get current location
        const { pathname } = location;

        // capitalize the first letter of the each segment

        const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

        // seperate the segments from the URL
        const pathnames = pathname
            .split('/')
            .filter((item) => item)
            .map((item) =>
                item.includes('-')
                    ? item
                          .split('-')
                          .map((word) => capatilize(word))
                          .join(' ')
                    : capatilize(item)
            );

        return (
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 16,
                    },
                }}
            >
                <div className='breadcrumb-container flex h-[60px] w-full items-center font-semibold'>
                    <Breadcrumb
                        separator='>'
                        items={[
                            pathnames.length <= 0 ? { title: 'Home' } : { title: 'Home', href: '/' },

                            ...pathnames.map((name) => ({
                                title:
                                    name === pathnames[pathnames.length - 1] && titleProduct
                                        ? titleProduct
                                        : capatilize(name),
                            })),
                        ]}
                    />
                </div>
            </ConfigProvider>
        );
    };

    return <>{breadCrumbView()}</>;
};

export default BreadcrumbDisplay;
