import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Badge } from 'antd';

interface IIconButtonProps {
    icon: 'HeartOutlined' | 'ShoppingCartOutlined' | 'UserOutlined';
    name?: string;
    subName?: string;
    count?: number;
    isWishlist?: boolean;
}

const iconMap = {
    HeartOutlined,
    ShoppingCartOutlined,
    UserOutlined,
};

const IconButton: React.FC<IIconButtonProps> = ({ icon, name, subName, count, isWishlist }) => {
    const Comp = iconMap[icon];
    const isShoppingCartOutlined = icon === 'ShoppingCartOutlined';

    const containerClass = isShoppingCartOutlined
        ? 'justify-between gap-2 lg:flex'
        : 'hidden justify-between gap-2 lg:flex';
    const hiddenShoppingCartOutlined = isShoppingCartOutlined ? 'hidden lg:block' : '';

    return (
        <div className={containerClass}>
            <Badge count={count} overflowCount={10}>
                <Comp style={{ color: '#ffffff', fontSize: '40px' }} />
            </Badge>

            <div className={hiddenShoppingCartOutlined}>
                <span className='block font-medium capitalize text-white'>{subName}</span>

                <span className={`block w-20 truncate capitalize text-white ${isWishlist ? 'mt-3 text-lg' : ''}`}>
                    {name}
                </span>
            </div>
        </div>
    );
};

export default IconButton;
