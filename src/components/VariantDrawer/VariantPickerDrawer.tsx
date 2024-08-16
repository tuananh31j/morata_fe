import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Drawer, InputNumber, Space } from 'antd';
import clsx from 'clsx';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductActions from '~/components/_common/ProductActions';
import RatingDisplay from '~/components/_common/RatingDisplay';
import { MAIN_ROUTES } from '~/constants/router';
import useFilter from '~/hooks/_common/useFilter';
import { useMutationCart } from '~/hooks/cart/Mutations/useAddCart';
import useMutationAddWishList from '~/hooks/wishlist/Mutations/useAddWishList';
import { useMutationRemoveWishList } from '~/hooks/wishlist/Mutations/useRemoveWishList';
import useGetAllWishlist from '~/hooks/wishlist/Queries/useGetAllWishlist';
import { RootState } from '~/store/store';
import { variationAttribute } from '~/types/cart/CartResponse';
import { IProductItemNew } from '~/types/Product';
import { Currency } from '~/utils';
import showMessage from '~/utils/ShowMessage';
type IStateVariant = {
    _id: string;
    price: number;
    discountPercentage?: number;
    stock: number;
    sold?: number;
    sku: string;
    storage?: string;
    image?: string;
    productId: string;
    variantAttributes: variationAttribute[];
    isActive: boolean;
    imageUrlRef?: string;
};

export default function VariantPickerDrawer({
    children,
    product,
}: {
    children: React.ReactNode;
    product: IProductItemNew;
}) {
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState<IStateVariant>();
    const [active, setActive] = useState<string>();
    const [valueQuantity, setQuantityValue] = useState(1);
    const navigate = useNavigate();
    const addToCart = useMutationCart();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleOnclickVariant = (item: IStateVariant) => {
        setVariant(item);
    };
    const handleChangeVariant = (item: IStateVariant) => {
        handleOnclickVariant(item);
        setActive(item._id);
    };
    const handleIncrement = () => {
        if (valueQuantity < (variant ? variant.stock : 0)) setQuantityValue(valueQuantity + 1);
    };
    const handleDecrement = () => {
        if (valueQuantity > 1) setQuantityValue(valueQuantity - 1);
    };
    const onChangeInputQuantity = (e: number | null) => {
        setQuantityValue(e ? e : 1);
    };
    const initialVariant = product?.variationIds?.find((item) => item.stock > 0 && item.isActive);
    const handleOnSubmit = () => {
        if (user) {
            const bodyAddToCart = {
                productVariation: variant ? variant._id : '',
                userId: user._id,
                quantity: valueQuantity,
            };
            addToCart.mutate(bodyAddToCart, {
                onSuccess: () => {
                    setOpen(false);
                },
            });

            setQuantityValue(1);
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };
    useEffect(() => {
        setVariant(initialVariant);
        setActive(initialVariant?._id || '');
    }, []);
    const { query } = useFilter();
    const { data: allWishList } = useGetAllWishlist(query);
    const wishListIds = allWishList?.data.wishList.map((item) => item._id);
    const { mutate: addWishlist } = useMutationAddWishList();
    const { handleRemoveWishList } = useMutationRemoveWishList();
    const debouncedRemove = debounce((ProductId: string) => handleRemoveWishList(ProductId), 500);
    const handleAddWishlist = () => {
        if (user) {
            addWishlist({ productId: product._id as string });
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };

    return (
        <>
            <div className='w-full' onClick={showDrawer}>
                {children}
            </div>
            <Drawer title={product.name} placement={'bottom'} height={'auto'} onClose={onClose} open={open}>
                <Space>
                    <Space className='overflow-hidden rounded-[15px]'>
                        <img className='h-[350px] max-w-[500px] ' src={variant?.image} alt='' />
                    </Space>
                    <div>
                        <h1 className='text-xl font-medium text-black'>{product.name}</h1>
                        <RatingDisplay rating={product.rating} reviews={product.reviewCount} />
                        <span className='text-xl font-medium text-black'>{Currency.format(variant?.price!)}</span>
                        <div className='mt-2 flex items-center gap-3'>
                            {product?.variationIds.map((item) => {
                                return (
                                    <div
                                        onClick={() => handleChangeVariant(item)}
                                        key={item._id}
                                        className={clsx(
                                            `flex cursor-pointer items-center justify-between gap-3 rounded-sm border-2  bg-white px-2 py-1 transition duration-300 hover:border-blue-600`,
                                            active === item._id && item.stock >= 1
                                                ? 'border-blue-600'
                                                : 'border-blue-200',
                                            item.stock < 1 || !item.isActive ? 'pointer-events-none opacity-50' : ''
                                        )}
                                    >
                                        <div className='select-none'>
                                            <img src={item.image} alt='variant product' className='h-10 w-10' />
                                        </div>
                                        {item?.variantAttributes?.map((attr: variationAttribute, index) => (
                                            <span key={index} className='select-none text-sm font-medium text-black'>
                                                {attr.value}{' '}
                                            </span>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                        <div className='flex flex-col'>
                            <div className='mt-2 flex items-center gap-2'>
                                <span className='select-none  font-medium'>Sản phẩm còn lại:</span>

                                {variant?.stock === 0 || !variant?.isActive ? (
                                    <span className='text-red'>Sản phẩm hết hàng</span>
                                ) : (
                                    ''
                                )}
                                {(variant?.stock as number) > 0 && <span className=''>{variant?.stock}</span>}
                            </div>
                            <div className='flex items-center gap-4'>
                                <Space className='mt-2'>
                                    <Button
                                        disabled={valueQuantity < 2}
                                        className='h-[48px] w-[48px]'
                                        onClick={handleDecrement}
                                    >
                                        -
                                    </Button>
                                    <InputNumber
                                        onChange={onChangeInputQuantity}
                                        min={1}
                                        value={valueQuantity}
                                        max={variant?.stock}
                                        className='flex h-[48px] w-[58px] items-center'
                                        controls={false}
                                    />
                                    <Button
                                        disabled={valueQuantity === variant?.stock}
                                        className='h-[48px] w-[48px]'
                                        onClick={handleIncrement}
                                    >
                                        +
                                    </Button>
                                </Space>
                                <div>
                                    {wishListIds?.includes(product._id as string) ? (
                                        <>
                                            <Button
                                                className='flex items-center'
                                                onClick={() => debouncedRemove(product._id!)}
                                            >
                                                <HeartFilled className='text-red' /> Đã thêm vào yêu thích
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button className='flex items-center' onClick={handleAddWishlist}>
                                                <HeartOutlined /> Thêm vào yêu thích
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mt-4 w-[100%]'>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                defaultHoverBg: '#16bcdc',
                                                defaultHoverColor: 'white',
                                                defaultHoverBorderColor: 'none',
                                            },
                                        },
                                    }}
                                >
                                    <Button
                                        onClick={handleOnSubmit}
                                        loading={addToCart.isPending}
                                        disabled={variant?.stock === 0 || !variant?.isActive}
                                        className={`h-[50px] w-[100%] rounded-[30px] bg-[#222222] font-bold text-white ${variant?.stock === 0 || !variant?.isActive ? 'pointer-events-none opacity-60' : 'hover:bg-[#16bcdc]'}`}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </ConfigProvider>
                            </div>
                        </div>
                    </div>
                </Space>
            </Drawer>
        </>
    );
}
