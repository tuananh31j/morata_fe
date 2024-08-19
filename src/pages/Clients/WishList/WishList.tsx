import { DeleteTwoTone, FrownTwoTone } from '@ant-design/icons';
import { Button, Card, Flex, Image, Rate, Space, Tooltip } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import WrapperList from '~/components/_common/WrapperList';
import { MAIN_ROUTES } from '~/constants/router';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useFilter from '~/hooks/_common/useFilter';
import { useMutationCart } from '~/hooks/cart/Mutations/useAddCart';
import { useMutationRemoveWishList } from '~/hooks/wishlist/Mutations/useRemoveWishList';
import useGetAllWishlist from '~/hooks/wishlist/Queries/useGetAllWishlist';
import { RootState } from '~/store/store';
import { Currency } from '~/utils';
import showMessage from '~/utils/ShowMessage';

interface IPickerData {
    _id: string;
}
const Wishlist = () => {
    useDocumentTitle('Wish List');
    const { query } = useFilter();
    const [valueQuantity, setQuantityValue] = useState(1);
    const { data: wishList } = useGetAllWishlist(query);
    const { handleRemoveWishList } = useMutationRemoveWishList();
    const wishListProduct = wishList?.data.wishList;
    const navigate = useNavigate();
    const { mutate } = useMutationCart();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const debouncedRemove = debounce((id: string) => handleRemoveWishList(id), 500);
    const handleOnSubmit = (data: IPickerData) => {
        if (user) {
            const bodyAddToCart = {
                productVariation: data._id,
                userId: user._id,
                quantity: valueQuantity,
            };
            mutate(bodyAddToCart);
            setQuantityValue(1);
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };
    return (
        <WrapperList classic title='My Wish List' className='mt-0'>
            {!wishList?.data.wishList.length && (
                <Flex vertical={true}>
                    <Card className='w-full rounded-lg'>
                        <Space className='flex flex-col'>
                            <div className='text-lg font-semibold'>
                                <Space>
                                    YOUR WISH LIST HAS NO ITEMS <FrownTwoTone />
                                </Space>
                            </div>

                            <div className='text-base'>Press the heart mark to add items on your wish list.</div>
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

                                            <Tooltip title='Remove from wishlist' placement='left' color='#108ee9'>
                                                <Button
                                                    type='text'
                                                    size='large'
                                                    shape='round'
                                                    onClick={() => debouncedRemove(item._id)}
                                                    icon={<DeleteTwoTone />}
                                                />
                                            </Tooltip>
                                        </div>

                                        <div className='mt-3'>
                                            <Space>
                                                <Rate allowHalf disabled value={item.rating} />{' '}
                                                <span>({item.reviewCount} reviews)</span>
                                            </Space>
                                        </div>

                                        <div className='my-2 text-base'>
                                            <Space>
                                                <span className='font-semibold'>Avaiability: </span>
                                                {item.isAvailable ? (
                                                    <span className='font-semibold text-[#22c55e]'>in stock</span>
                                                ) : (
                                                    <span className='font-semibold text-red'>out of stock</span>
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
                                            {/* <Link to={`/products/${item._id}`}>
                                                <Button shape='round' size='large' className='w-1/2'>
                                                    View Details
                                                </Button>
                                            </Link> */}
                                            <Button
                                                shape='round'
                                                size='large'
                                                className='w-1/2'
                                                onClick={() => navigate(`/products/${item._id}`)}
                                            >
                                                View Details
                                            </Button>
                                            <Button
                                                shape='round'
                                                size='large'
                                                className='w-1/2'
                                                onClick={() => handleOnSubmit({ _id: item.variationIds[0]._id })}
                                            >
                                                Add to cart
                                            </Button>
                                        </div>
                                    </div>
                                </Flex>
                            </Card>
                        ))}

                    {/* <Card className='w-5/6 px-8 rounded-lg'>
                        <Flex>
                            <Image
                                className='object-cover border border-solid h-55 w-80 rounded-xl'
                                src='https://firebasestorage.googleapis.com/v0/b/morata-98d71.appspot.com/o/files%2Fsamsung-galaxy-watch-ultra-cam1.jpg%2F2024-7-27%2013%3A29%3A52?alt=media&token=37aa1ce7-d944-49b2-9d68-e831664c87ee'
                            />

                            <div className='w-full ml-10'>
                                <div className='flex items-center justify-between text-2xl font-semibold '>
                                    <span>Galaxy Watch Ultra LTE 47mm Smartwatch</span>

                                    <Tooltip title='Remove from wishlist' placement='left' color='#108ee9'>
                                        <Button type='text' size='large' shape='round' icon={<DeleteTwoTone />} />
                                    </Tooltip>
                                </div>

                                <div className='mt-3'>
                                    <Space>
                                        <Rate allowHalf disabled value={4.5} /> <span>(25 reviews)</span>
                                    </Space>
                                </div>

                                <div className='my-2 text-base'>
                                    <Space>
                                        <span className='font-semibold'>Avaiability: </span>

                                        <span className='font-semibold text-[#22c55e]'>in stock</span>
                                    </Space>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <Space>
                                        <Image
                                            width={45}
                                            height={45}
                                            preview={false}
                                            src='https://firebasestorage.googleapis.com/v0/b/morata-98d71.appspot.com/o/files%2Fsamsung-galaxy-watch-ultra-cam1.jpg%2F2024-7-27%2013%3A29%3A52?alt=media&token=37aa1ce7-d944-49b2-9d68-e831664c87ee'
                                            className='object-cover p-1 border border-solid rounded-lg'
                                        />

                                        <Image
                                            width={45}
                                            height={45}
                                            preview={false}
                                            src='https://firebasestorage.googleapis.com/v0/b/morata-98d71.appspot.com/o/files%2Fsamsung-galaxy-watch-ultra-cam1.jpg%2F2024-7-27%2013%3A29%3A52?alt=media&token=37aa1ce7-d944-49b2-9d68-e831664c87ee'
                                            className='object-cover p-1 border border-solid rounded-lg'
                                        />

                                        <Image
                                            width={45}
                                            height={45}
                                            preview={false}
                                            src='https://firebasestorage.googleapis.com/v0/b/morata-98d71.appspot.com/o/files%2Fsamsung-galaxy-watch-ultra-cam1.jpg%2F2024-7-27%2013%3A29%3A52?alt=media&token=37aa1ce7-d944-49b2-9d68-e831664c87ee'
                                            className='object-cover p-1 border border-solid rounded-lg'
                                        />
                                    </Space>

                                    <div className='flex justify-end text-2xl'>
                                        <Space>
                                            <div className='flex items-center font-semibold text-[#64748b]'>
                                                {Currency.format(100)}
                                            </div>

                                            <div className='flex items-center font-semibold line-through text-red'>
                                                {Currency.format(150)}
                                            </div>
                                        </Space>
                                    </div>
                                </div>

                                <div className='flex items-center justify-end gap-2 mt-3'>
                                    <Button shape='round' size='large' className='w-1/2' onClick={() => {}}>
                                        Button gi do
                                    </Button>

                                    <Button shape='round' size='large' className='w-1/2' onClick={() => {}}>
                                        Add to cart
                                    </Button>
                                </div>
                            </div>
                        </Flex>
                    </Card>

                    <Card className='w-5/6 px-8 rounded-lg'>
                        <Flex>
                            <Image
                                className='object-cover border border-solid h-55 w-80 rounded-xl'
                                src='https://firebasestorage.googleapis.com/v0/b/morata-98d71.appspot.com/o/files%2Fsamsung-galaxy-watch-ultra-cam1.jpg%2F2024-7-27%2013%3A29%3A52?alt=media&token=37aa1ce7-d944-49b2-9d68-e831664c87ee'
                            />

                            <div className='w-full ml-10'>
                                <div className='flex items-center justify-between text-2xl font-semibold '>
                                    <span>Galaxy Watch Ultra LTE 47mm Smartwatch</span>

                                    <Tooltip title='Remove from wishlist' placement='left' color='#108ee9'>
                                        <Button type='text' size='large' shape='round' icon={<DeleteTwoTone />} />
                                    </Tooltip>
                                </div>

                                <div className='mt-3'>
                                    <Space>
                                        <Rate allowHalf disabled value={4.5} /> <span>(25 reviews)</span>
                                    </Space>
                                </div>

                                <div className='my-2 text-base'>
                                    <Space>
                                        <span className='font-semibold'>Avaiability: </span>

                                        <span className='font-semibold text-[#22c55e]'>in stock</span>
                                    </Space>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <Space>
                                        <Image
                                            width={45}
                                            height={45}
                                            preview={false}
                                            src='https://firebasestorage.googleapis.com/v0/b/morata-98d71.appspot.com/o/files%2Fsamsung-galaxy-watch-ultra-cam1.jpg%2F2024-7-27%2013%3A29%3A52?alt=media&token=37aa1ce7-d944-49b2-9d68-e831664c87ee'
                                            className='object-cover p-1 border border-solid rounded-lg'
                                        />

                                        <Image
                                            width={45}
                                            height={45}
                                            preview={false}
                                            src='https://firebasestorage.googleapis.com/v0/b/morata-98d71.appspot.com/o/files%2Fsamsung-galaxy-watch-ultra-cam1.jpg%2F2024-7-27%2013%3A29%3A52?alt=media&token=37aa1ce7-d944-49b2-9d68-e831664c87ee'
                                            className='object-cover p-1 border border-solid rounded-lg'
                                        />

                                        <Image
                                            width={45}
                                            height={45}
                                            preview={false}
                                            src='https://firebasestorage.googleapis.com/v0/b/morata-98d71.appspot.com/o/files%2Fsamsung-galaxy-watch-ultra-cam1.jpg%2F2024-7-27%2013%3A29%3A52?alt=media&token=37aa1ce7-d944-49b2-9d68-e831664c87ee'
                                            className='object-cover p-1 border border-solid rounded-lg'
                                        />
                                    </Space>

                                    <div className='flex justify-end text-2xl'>
                                        <Space>
                                            <div className='flex items-center font-semibold text-[#64748b]'>
                                                {Currency.format(100)}
                                            </div>

                                            <div className='flex items-center font-semibold line-through text-red'>
                                                {Currency.format(150)}
                                            </div>
                                        </Space>
                                    </div>
                                </div>

                                <div className='flex items-center justify-end gap-2 mt-3'>
                                    <Button shape='round' size='large' className='w-1/2' onClick={() => {}}>
                                        Button gi do
                                    </Button>

                                    <Button shape='round' size='large' className='w-1/2' onClick={() => {}}>
                                        Add to cart
                                    </Button>
                                </div>
                            </div>
                        </Flex>
                    </Card> */}
                </Flex>
            )}
        </WrapperList>
    );
};

export default Wishlist;
