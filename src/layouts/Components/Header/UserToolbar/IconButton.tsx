import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

interface IIconButtonProps {
    icon: 'HeartOutlined' | 'ShoppingCartOutlined' | 'UserOutlined';
    name: string;
    subName: string;
}

const iconMap = {
    HeartOutlined: HeartOutlined,
    ShoppingCartOutlined: ShoppingCartOutlined,
    UserOutlined: UserOutlined,
};

const IconButton: React.FC<IIconButtonProps> = ({ icon, name, subName }) => {
    const Comp = iconMap[icon];
    return (
        <div className='hidden justify-between gap-2 lg:flex '>
            <Comp style={{ color: '#ffffff', fontSize: '40px' }} />
            <div>
                <span className='block font-medium capitalize text-gray-400'>{subName}</span>
                <span className='block capitalize text-white'>{name}</span>
            </div>
        </div>
    );
};

export default IconButton;
