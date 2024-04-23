import PopupCart from '~/components/PopupCart';
import IconButton from './IconButton';

const UserToolbar = () => {
    return (
        <div className='justify-between gap-2 lg:flex'>
            <IconButton name='account' subName='login' icon='UserOutlined' />
            <IconButton name='my favorite' subName='favorite' icon='HeartOutlined' />
            <PopupCart>
                <IconButton name='$300' subName='your cart' icon='ShoppingCartOutlined' />
            </PopupCart>
        </div>
    );
};

export default UserToolbar;
