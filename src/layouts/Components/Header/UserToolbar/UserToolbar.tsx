import CartDrawer from '~/components/CartDrawer';
import IconButton from './IconButton';
import WishListDrawer from '~/components/WishListDrawer';
import { Link } from 'react-router-dom';

const UserToolbar = () => {
    return (
        <div className='justify-between gap-2 lg:flex'>
            <Link className='cursor-pointer' to={'login'}>
                <IconButton name='account' subName='login' icon='UserOutlined' />
            </Link>
            <WishListDrawer>
                <IconButton count={5} name='my favorite' subName='favorite' icon='HeartOutlined' />
            </WishListDrawer>
            <CartDrawer>
                <IconButton name='$300' count={3} subName='your cart' icon='ShoppingCartOutlined' />
            </CartDrawer>
        </div>
    );
};

export default UserToolbar;
