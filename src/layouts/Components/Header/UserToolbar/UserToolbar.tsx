import PopupCart from '~/components/PopupCart';
import IconButton from './IconButton';
import PopupWishlist from '~/components/PopupWishlist';

const UserToolbar = () => {
    return (
        <div className='justify-between gap-2 lg:flex'>
            <IconButton name='account' subName='login' icon='UserOutlined' />
            <PopupWishlist>
                <IconButton count={5} name='my favorite' subName='favorite' icon='HeartOutlined' />
            </PopupWishlist>
            <PopupCart>
                <IconButton name='$300' count={3} subName='your cart' icon='ShoppingCartOutlined' />
            </PopupCart>
        </div>
    );
};

export default UserToolbar;
