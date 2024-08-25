import { CaretDownOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Menu, Skeleton } from 'antd';
import { MenuProps } from 'antd/lib';
import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import useFilter from '~/hooks/_common/useFilter';
import DropDownHeader from '~/layouts/_components/Main/Header/Navbar/DropDownHeader';
import { IBrand } from '~/types/Brand';
import { IMenu } from '~/types/Category';
import MenuItem from './MenuItem';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = ({ categories, brands }: { categories: IMenu[]; brands: IBrand[] }) => {
    const { reset } = useFilter();

    const cateItems: MenuItem[] = [
        {
            label: (
                <Link onClick={() => reset()} to={MAIN_ROUTES.PRODUCTS}>
                    <span className='text-[16px] font-medium uppercase text-white'>Tất cả sản phẩm</span>
                </Link>
            ),
            key: '1',
            disabled: true,
        },
        {
            label: (
                <DropDownHeader
                    icon={<UnorderedListOutlined />}
                    isBrand={false}
                    itemsList={categories}
                    name='Danh mục'
                />
            ),
            key: '2',
            disabled: true,
        },
    ];
    const BrandItems: MenuItem[] = [
        {
            label: (
                <DropDownHeader icon={<UnorderedListOutlined />} isBrand={true} itemsList={brands} name='Thương Hiệu' />
            ),
            key: '3',
            disabled: true,
        },
    ];
    const itemsMenu: MenuItem[] = [...cateItems, ...BrandItems];
    return (
        <div>
            {categories.length > 0 && (
                <Menu
                    theme='dark'
                    mode='horizontal'
                    className=' bg-transparent text-white'
                    items={itemsMenu}
                    overflowedIndicator={<CaretDownOutlined />}
                />
            )}
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
