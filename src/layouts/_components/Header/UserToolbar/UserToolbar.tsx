import CartDrawer from '~/components/CartDrawer';
import IconButton from './IconButton';
import WishListDrawer from '~/components/WishListDrawer';
import { Link } from 'react-router-dom';
import { IUserLogin } from '~/types/User ';
import useGetMyCart from '~/hooks/Queries/useGetMyCart';
import { CartItem } from '~/types/Cart';
import UserToolBarSkeleton from '~/components/_common/skeleton/UserToolKit/UserToolBarSkeleton';

export type ItemsCartReduce = {
    productId: CartItem;
    quantity: number;
};
const UserToolbar = ({ state }: { state: IUserLogin | null }) => {
    const { data, isLoading } = useGetMyCart(state?._id);
    const totalOrderAmount = data
        ? data?.data?.items?.reduce(
              (total: number, product: ItemsCartReduce) => total + product.productId.price * product.quantity,
              0
          )
        : 0;
    const totalQuantityAmount = data
        ? data?.data?.items?.reduce((total: number, product: ItemsCartReduce) => total + product.quantity, 0)
        : 0;
    return (
        <div className='justify-between gap-2 lg:flex'>
            {isLoading && (
                <>
                    <UserToolBarSkeleton />
                    <UserToolBarSkeleton />
                    <UserToolBarSkeleton />
                </>
            )}
            {state && !isLoading && (
                <>
                    <Link className='cursor-pointer' to={'account/profile'}>
                        <IconButton name={`${state.username}`} subName='Hello' icon='UserOutlined' />
                    </Link>
                    <WishListDrawer>
                        <IconButton count={0} name='my favorite' subName='favorite' icon='HeartOutlined' />
                    </WishListDrawer>
                    <CartDrawer item={data?.data}>
                        <IconButton
                            name={`${totalOrderAmount}$`}
                            count={totalQuantityAmount}
                            subName='Your Cart'
                            icon='ShoppingCartOutlined'
                        />
                    </CartDrawer>
                </>
            )}
            {!state && !isLoading && (
                <>
                    <Link className='cursor-pointer' to={'/auth/login'}>
                        <IconButton name='account' subName='login' icon='UserOutlined' />
                    </Link>
                    <Link to={`/auth/login`}>
                        <IconButton count={0} name='my favorite' subName='favorite' icon='HeartOutlined' />
                    </Link>
                    <Link to={'/auth/login'}>
                        <IconButton name='0$' count={0} subName='your cart' icon='ShoppingCartOutlined' />
                    </Link>
                </>
            )}
        </div>
    );
};

export default UserToolbar;
