import { ConfigProvider, TabsProps } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';

const ManageProducts = () => {
    const navigate = useNavigate();
    const onChange = (key: string) => {
        navigate(`${ADMIN_ROUTES.PRODUCTS_LIST}/${key}`);
    };
    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: 'All',
        },
        {
            key: 'live',
            label: 'Active',
        },
        {
            key: 'deleted',
            label: 'Deleted',
        },
        {
            key: 'hidden',
            label: 'Hidden',
        },
    ];
    const firstItemIndex = 0;
    const defaultItem = items[firstItemIndex].key;

    return (
        <>
            <div className='mx-6 mt-6'>
                <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                                titleFontSizeLG: 18,
                            },
                        },
                    }}
                >
                    {/* <Tabs
                        defaultActiveKey={defaultItem}
                        items={items}
                        onChange={onChange}
                        type='line'
                        size='large'
                        className='px-3'
                    /> */}
                </ConfigProvider>
            </div>
            <Outlet />
        </>
    );
};

export default ManageProducts;
