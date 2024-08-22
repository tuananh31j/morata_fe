import { IMenu } from '~/types/Category';
import MenuItem from './MenuItem';
import { Menu, Skeleton } from 'antd';
import { MenuProps } from 'antd/lib';
import { CaretDownOutlined, MoreOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = ({ data }: { data: IMenu[] }) => {
    const items: MenuItem[] = data.map((item) => ({
        label: <MenuItem id={item._id} name={item.name} />,
        key: item._id,
        disabled: true,
    }));
    return (
        <div>
            <Menu
                theme='dark'
                mode='horizontal'
                className='bg-transparent text-white'
                items={items}
                overflowedIndicator={<CaretDownOutlined />}
            />
            {data.length === 0 && (
                <>
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                </>
            )}
        </div>
    );
};

export default Navbar;
