import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    FlagOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    TruckOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Space, Tabs } from 'antd';
import React from 'react';

interface OrderManagementTabsProps {
    activeKey?: string;
    onChange?: (key: string) => void;
}

type TabItem = {
    key: string;
    label: React.ReactNode;
};

const OrderManagementTabs: React.FC<OrderManagementTabsProps> = ({ activeKey, onChange }) => {
    const getTabItem = (key: string, label: string, icon: React.ReactNode): TabItem => ({
        key,
        label: (
            <span className='flex items-center'>
                <Space>
                    {icon}
                    <span>{label}</span>
                </Space>
            </span>
        ),
    });

    const items: TabItem[] = [
        getTabItem('all', 'All', <ShoppingCartOutlined />),
        getTabItem('pending', 'Pending', <ClockCircleOutlined />),
        getTabItem('confirmed', 'Confirmed', <CheckCircleOutlined />),
        getTabItem('shipping', 'Shipping', <TruckOutlined />),
        getTabItem('delivered', 'Delivered', <HomeOutlined />),
        getTabItem('done', 'Done', <FlagOutlined />),
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        itemHoverColor: '#1890ff',
                        itemSelectedColor: '#1890ff',
                        itemColor: '#595959',
                        titleFontSize: 16,
                    },
                },
                token: {
                    colorPrimary: '#1890ff',
                    borderRadius: 4,
                },
            }}
        >
            <div className='tab-container'>
                <Tabs
                    defaultActiveKey={activeKey || 'all'}
                    items={items}
                    onChange={onChange}
                    size='large'
                    className='order-management-tabs'
                    tabBarStyle={{
                        marginLeft: 24,
                        borderBottom: '2px solid #f0f0f0',
                        marginRight: 24,
                        background: '#fff',
                        padding: '16px ',
                        borderRadius: '6px 6px 0 0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }}
                    tabBarGutter={32}
                />
            </div>
        </ConfigProvider>
    );
};

export default OrderManagementTabs;
