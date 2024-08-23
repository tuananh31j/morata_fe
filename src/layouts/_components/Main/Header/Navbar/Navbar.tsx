import { IMenu } from '~/types/Category';
import MenuItem from './MenuItem';
import { Menu, Skeleton } from 'antd';
import { MenuProps } from 'antd/lib';
import { CaretDownOutlined, MoreOutlined } from '@ant-design/icons';
import { IBrand } from '~/types/Brand';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = ({ categories, brands }: { categories: IMenu[]; brands: IBrand[] }) => {
    const cateItems: MenuItem[] = categories.map((item) => ({
        label: <MenuItem id={item._id} name={item.name} />,
        key: item._id,
        disabled: true,
    }));
    const BrandItems: MenuItem[] = brands.map((item) => ({
        label: <MenuItem id={item._id} name={item.name} isBrand />,
        key: item._id,
        disabled: true,
    }));
    const items: MenuItem[] = [...cateItems, ...BrandItems];
    return (
        <div>
            <Menu
                theme='dark'
                mode='horizontal'
                className='bg-transparent text-white'
                items={items}
                overflowedIndicator={<CaretDownOutlined />}
            />
            {categories.length === 0 && (
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
