import { DownOutlined } from '@ant-design/icons';
import { ConfigProvider, Dropdown, Space } from 'antd';
import { MenuProps } from 'antd/lib';
import { ReactNode } from 'react';
import MenuItem from '~/layouts/_components/Main/Header/Navbar/MenuItem';
import { IBrand } from '~/types/Brand';
import { ICategory } from '~/types/Category';

export default function DropDownHeader({
    icon,
    name,
    itemsList,
    isBrand,
}: {
    icon: ReactNode;
    name: string;
    itemsList: IBrand[] | ICategory[];
    isBrand: boolean;
}) {
    const items: MenuProps['items'] = itemsList.map((item) => ({
        key: item._id,
        label: <MenuItem name={item.name} id={item._id} isBrand={isBrand} />,
    }));
    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadiusXS: 2,
                },
                components: {
                    Dropdown: { paddingBlock: 5 },
                },
            }}
        >
            <Dropdown className='ml-6 text-[16px] font-medium uppercase text-white' menu={{ items }}>
                <Space className='cursor-pointer'>
                    {icon}
                    {name}
                    <DownOutlined />
                </Space>
            </Dropdown>
        </ConfigProvider>
    );
}
