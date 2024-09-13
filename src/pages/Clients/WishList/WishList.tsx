import { CloseOutlined, FrownTwoTone } from '@ant-design/icons';
import { Button, Card, Flex, Image, Rate, Space, Tooltip } from 'antd';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import WrapperList from '~/components/_common/WrapperList';
import VariantPickerDrawer from '~/components/VariantDrawer/VariantPickerDrawer';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useFilter from '~/hooks/_common/useFilter';
import { useMutationRemoveWishList } from '~/hooks/wishlist/Mutations/useRemoveWishList';
import useGetAllWishlist from '~/hooks/wishlist/Queries/useGetAllWishlist';
import { Currency } from '~/utils';

const Wishlist = () => {
    useDocumentTitle('Danh sách yêu thích');
    const { query } = useFilter();
    const { data: wishList } = useGetAllWishlist(query);
    const { handleRemoveWishList, isPending } = useMutationRemoveWishList();
    const wishListProduct = wishList?.data.wishList;
    const navigate = useNavigate();
    const debouncedRemove = debounce((id: string) => handleRemoveWishList(id), 500);

    return (
        <WrapperList classic title='Danh sách sản phẩm yêu thích' className='mt-4'>
            {!wishList?.data.wishList.length && (
                <Flex vertical={true}>
                    <Card className='w-full rounded-lg'>
                        <Space className='flex flex-col'>
                            <div className='text-lg font-semibold'>
                                <Space>
                                    Danh sách của bạn hiện không có sản phẩm nào <FrownTwoTone />
                                </Space>
                            </div>

                            <div className='text-base'>
                                Nhấn vào nút trái tim để thêm sản phẩm vào danh sách yêu thích.
                            </div>
                        </Space>
                    </Card>
                </Flex>
            )}

            {wishList && (
                <Flex vertical={true} className='items-center justify-center gap-3'>
                    {wishListProduct &&
                        wishListProduct.map((item) => (
                            <Card key={item._id} className='w-5/6 rounded-lg px-8'>
                                <Flex>
                                    <Image
                                        className='h-55 w-80 rounded-xl border border-solid object-cover'
                                        src={item.thumbnail}
                                    />

                                    <div className='ml-10 w-full'>
                                        <div className='flex items-center justify-between text-2xl font-semibold '>
                                            <span>{item.name}</span>

                                            <Tooltip
                                                title='Xóa khỏi danh sách yêu thích'
                                                placement='left'
                                                color='#108ee9'
                                            >
                                                <Button
                                                    type='text'
                                                    size='large'
                                                    loading={isPending}
                                                    className='hover:rotate-180 hover:text-cyan-500'
                                                    onClick={() => debouncedRemove(item._id)}
                                                    icon={<CloseOutlined />}
                                                />
                                            </Tooltip>
                                        </div>

                                        <div className='mt-3'>
                                            <Space>
                                                <Rate allowHalf disabled value={item.rating} />{' '}
                                                <span>({item.reviewCount} đánh giá)</span>
                                            </Space>
                                        </div>

                                        <div className='my-2 text-base'>
                                            <Space>
                                                <span className='font-semibold'>Trạng thái: </span>
                                                {item.variationIds.some((a) => {
                                                    console.log(a.stock > 0 && a.isActive);

                                                    return a.stock > 0 && a.isActive;
                                                }) ? (
                                                    <span className='font-semibold text-[#22c55e]'>Còn hàng</span>
                                                ) : (
                                                    <span className='font-semibold text-red'>Hết hàng</span>
                                                )}
                                            </Space>
                                        </div>

                                        <div className='flex items-center justify-between'>
                                            <Space>
                                                {item.images.map((image, i) => (
                                                    <Image key={i} width={45} height={45} preview={false} src={image} />
                                                ))}
                                            </Space>

                                            <div className='flex justify-end text-2xl'>
                                                <Space>
                                                    <div className='flex items-center font-semibold text-[#64748b]'>
                                                        {item.variationIds[0].price
                                                            ? Currency.format(item.variationIds[0].price)
                                                            : Currency.format(0)}
                                                    </div>

                                                    <div className='flex items-center font-semibold text-red line-through'>
                                                        {item.discount ||
                                                            (item.discount > 0 && Currency.format(item.discount))}
                                                    </div>
                                                </Space>
                                            </div>
                                        </div>
                                        <div className='mt-3 flex items-center justify-end gap-2'>
                                            <Button
                                                shape='round'
                                                size='large'
                                                className='w-1/2'
                                                onClick={() => navigate(`/products/${item._id}`)}
                                            >
                                                Xem chi tiết
                                            </Button>

                                            <VariantPickerDrawer product={item}>
                                                <Button
                                                    shape='round'
                                                    size='large'
                                                    className='w-1/2'
                                                    // onClick={() => handleOnSubmit({ _id: item.variationIds[0]._id })}
                                                >
                                                    Thêm vào giỏ hàng
                                                </Button>
                                            </VariantPickerDrawer>
                                        </div>
                                    </div>
                                </Flex>
                            </Card>
                        ))}
                </Flex>
            )}
        </WrapperList>
    );
};

export default Wishlist;
