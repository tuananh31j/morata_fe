import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import useFilter from '~/hooks/_common/useFilter';
import useMutationAddWishList from '~/hooks/wishlist/Mutations/useAddWishList';
import useGetAllWishlist from '~/hooks/wishlist/Queries/useGetAllWishlist';
import { RootState } from '~/store/store';
import showMessage from '~/utils/ShowMessage';

const ProductActions = ({ id }: { id: string }) => {
    const { query } = useFilter();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const { mutate: addWishlist } = useMutationAddWishList();
    const { data: allWishList } = useGetAllWishlist(query);
    const wishListIds = allWishList?.data.wishList.map((item) => item._id);
    const handleAddWishlist = () => {
        if (!user) {
            showMessage('You need to login first!', 'warning');
            navigate(MAIN_ROUTES.LOGIN);
            return;
        }

        addWishlist({ productId: id });
    };
    return (
        // group-data-[active=card]:opacity-100
        <div className='absolute right-[12px] top-1 z-10 gap-3 opacity-100 transition-opacity duration-300 ease-linear  md:left-[75%] md:right-[unset] md:flex md:translate-x-3/4 md:flex-col'>
            <div className='bg-gray-100 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                {wishListIds?.includes(id) ? (
                    <Tooltip placement='left' title='Sản phẩm yêu thích' arrow={true}>
                        <HeartFilled className='text-red' />
                    </Tooltip>
                ) : (
                    <Tooltip placement='left' title='Thêm vào yêu thích' arrow={true}>
                        <HeartOutlined className='hover:text-white' onClick={handleAddWishlist} />
                    </Tooltip>
                )}
            </div>

            {/* <Tooltip placement='left' className='hidden md:flex' title='Compare arrow={true}>
                <div className='bg-gray-100 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                    <InfoCircleOutlined className='hover:text-white' />
                </div>
            </Tooltip> */}

            {/* <Tooltip placement='left' className='hidden md:flex' title='Quick View' arrow={true}>
                <div className='bg-gray-100 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                    <EyeOutlined className='hover:text-white' />
                </div>
            </Tooltip> */}
        </div>
    );
};

export default ProductActions;
