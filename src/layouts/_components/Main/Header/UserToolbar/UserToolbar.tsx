import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartDrawer from '~/components/CartDrawer';
import WishListDrawer from '~/components/WishListDrawer';
import UserToolBarSkeleton from '~/components/_common/skeleton/UserToolKit/UserToolBarSkeleton';
import useGetMyCart from '~/hooks/Queries/Cart/useGetMyCart';
import { RootState } from '~/store/store';
import IconButton from './IconButton';
import { MAIN_ROUTES } from '~/constants/router';

const UserToolbar = () => {
    const user = useSelector((state: RootState) => state.authReducer.user);
    const { data, isLoading } = useGetMyCart(user?._id);
    const totalOrderAmount = data
        ? data?.data?.items?.reduce((total: number, product) => total + product.productId.price * product.quantity, 0)
        : 0;
    const totalQuantityAmount = data
        ? data?.data?.items?.reduce((total: number, product) => total + product.quantity, 0)
        : 0;
    return (
        <div className='justify-between gap-2 lg:flex'>
            {isLoading && !data && (
                <>
                    <UserToolBarSkeleton />
                    <UserToolBarSkeleton />
                    <UserToolBarSkeleton />
                </>
            )}
            {user && !isLoading && (
                <>
                    <Link className='cursor-pointer text-white' to={'/profile'}>
                        <IconButton name={`${user.username}`} subName='Hello' icon='UserOutlined' />
                    </Link>
                    <WishListDrawer>
                        <div className='text-white'>
                            <IconButton count={0} name='my favorite' subName='favorite' icon='HeartOutlined' />
                        </div>
                    </WishListDrawer>

                    <CartDrawer item={data ? data.data : undefined}>
                        <div className='text-white'>
                            <IconButton
                                name={`${totalOrderAmount}$`}
                                count={totalQuantityAmount}
                                subName='Your Cart'
                                icon='ShoppingCartOutlined'
                            />
                        </div>
                    </CartDrawer>
                </>
            )}
            {!user && !isLoading && (
                <>
                    <Link className='cursor-pointer text-white' to={MAIN_ROUTES.LOGIN}>
                        <IconButton name='account' subName='login' icon='UserOutlined' />
                    </Link>
                    <Link to={MAIN_ROUTES.LOGIN} className='cursor-pointer text-white'>
                        <IconButton count={0} name='my favorite' subName='favorite' icon='HeartOutlined' />
                    </Link>
                    <Link to={MAIN_ROUTES.LOGIN} className='cursor-pointer text-white'>
                        <IconButton name='0$' count={0} subName='your cart' icon='ShoppingCartOutlined' />
                    </Link>
                </>
            )}
        </div>
    );
};

export default UserToolbar;
