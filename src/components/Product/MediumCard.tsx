import { EyeOutlined, HeartOutlined, InfoCircleOutlined, StarFilled } from '@ant-design/icons';
import mainImage from '../../assets/images/products_5_1.webp';
import secondImage from '../../assets/images/products_5_2.webp';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Tooltip } from 'antd';
const MediumCard = () => {
    const [isScale, setIsScale] = useState<Boolean>(false);
    const [arrow, setArrow] = useState<string>('Show');
    const [productState, setProductState] = useState<number>(0);

    const favoriteText = <span>Add wishlist</span>;
    const compareText = <span>Add compare</span>;
    const viewText = <span>Quick view</span>;

    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
            return false;
        }

        if (arrow === 'Show') {
            return true;
        }

        return {
            pointAtCenter: true,
        };
    }, [arrow]);
    const handleScale = (status: string) => {
        status === 'open' ? setIsScale(true) : setIsScale(false);
    };
    const handleShowTool = (status: string, index?: number) => {
        status === 'open' ? setProductState(index || 0) : setProductState(index || 0);
    };

    return (
        <div className='grid grid-cols-1 gap-6 bg-gray-100 px-2 py-6 sm:grid-cols-2'>
            <div
                className='relative rounded-2xl bg-white p-6 md:p-5'
                onMouseEnter={() => handleShowTool('open', 1)}
                onMouseLeave={() => handleShowTool('close')}
            >
                <div className='sm:grid sm:grid-cols-2'>
                    <Link to={`/`} className='relative block w-full overflow-hidden'>
                        <img
                            src={secondImage}
                            alt=''
                            className={`absolute bottom-0 left-0 right-0 top-0 w-full transition-transform duration-500 ease-linear md:w-56 ${isScale ? 'scale-105' : 'scale-100'}`}
                        />
                        <img
                            src={mainImage}
                            alt=''
                            className='relative z-10 w-full opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear md:w-56'
                            onMouseOver={() => handleScale('open')}
                            onMouseLeave={() => handleScale('close')}
                        />

                        <div
                            className={`absolute right-[12px] md:${productState === 1 ? 'opacity-100' : 'opacity-0'} top-4 z-10 gap-3 transition-opacity duration-300 ease-linear md:left-[65%] md:right-[unset] md:flex md:translate-x-3/4 md:flex-col`}
                        >
                            <Tooltip placement='left' title={favoriteText} arrow={mergedArrow}>
                                <div className='flex items-center justify-center rounded-full bg-gray-100 p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                                    <HeartOutlined className='text-sx hover:text-white' />
                                </div>
                            </Tooltip>
                            <Tooltip
                                placement='left'
                                className='hidden md:flex'
                                title={compareText}
                                arrow={mergedArrow}
                            >
                                <div className='flex items-center justify-center rounded-full bg-gray-100 p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                                    <InfoCircleOutlined className='text-sx hover:text-white' />
                                </div>
                            </Tooltip>
                            <Tooltip placement='left' className='hidden md:flex' title={viewText} arrow={mergedArrow}>
                                <div className='flex items-center justify-center rounded-full bg-gray-100 p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                                    <EyeOutlined className='text-sx hover:text-white' />
                                </div>
                            </Tooltip>
                        </div>
                    </Link>
                    <div className='mt-3'>
                        <h4 className='line-clamp-2 cursor-default text-ellipsis text-sm font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                            Apple iPhone 11 Pro 256GB Space Gray – Unlocked
                        </h4>
                        <div
                            className='my-2 mb-3 flex flex-wrap items-end gap-1 sm:mb-2
                        '
                        >
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <span className='ml-1 text-sm text-gray-500'>(1 review)</span>
                        </div>
                        <div className='mb-3 flex gap-x-2'>
                            <span className='text-base font-semibold leading-5 text-red-600'>$21000</span>
                            <del className=' text-base font-semibold leading-5 text-gray-400'>$23000</del>
                        </div>
                        <ul className='mb-5'>
                            <li>
                                <a
                                    href='#'
                                    className="relative line-clamp-1 select-none pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']"
                                >
                                    Screen Size 10.9 inch
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className="relative line-clamp-1 select-none  text-ellipsis pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']"
                                >
                                    Operating System iOS 14.0
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className="relative line-clamp-1 select-none  text-ellipsis pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']"
                                >
                                    Product Length 9.74 inch
                                </a>
                            </li>
                        </ul>
                        <div className='h-2 w-full rounded-lg bg-gray-200'>
                            <div className={`h-full w-[80%] rounded-lg bg-[#cc1414]`}></div>
                        </div>
                        <div className='text-sx mb-6 leading-8'>
                            Sold:
                            <span className='mx-1 font-semibold'>85/100</span>
                            products
                        </div>
                        <Link
                            to={`/`}
                            className='block w-full rounded-3xl border-black bg-black py-2 text-center text-sm text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                        >
                            Add to Cart
                        </Link>
                    </div>
                </div>
                <div className='absolute left-[20px] top-[20px] z-10 inline-block select-none rounded-sm bg-lime-600 px-4 text-sm leading-6 text-white'>
                    -5%
                </div>
            </div>
            <div
                className='relative rounded-2xl bg-white p-6 md:p-5'
                onMouseEnter={() => handleShowTool('open', 2)}
                onMouseLeave={() => handleShowTool('close')}
            >
                <div className='sm:grid sm:grid-cols-2'>
                    <Link to={`/`} className='relative block w-full overflow-hidden'>
                        <img
                            src={secondImage}
                            alt=''
                            className={`absolute bottom-0 left-0 right-0 top-0 w-full transition-transform duration-500 ease-linear md:w-56 ${isScale ? 'scale-105' : 'scale-100'}`}
                        />
                        <img
                            src={mainImage}
                            alt=''
                            className='relative z-10 w-full opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear md:w-56'
                            onMouseOver={() => handleScale('open')}
                            onMouseLeave={() => handleScale('close')}
                        />

                        <div
                            className={`absolute right-[12px] md:${productState === 2 ? 'opacity-100' : 'opacity-0'}  top-4 z-10 gap-3 transition-opacity duration-300 ease-linear md:left-[65%] md:right-[unset] md:flex md:translate-x-3/4 md:flex-col`}
                        >
                            <Tooltip placement='left' className={``} title={favoriteText} arrow={mergedArrow}>
                                <div className='flex items-center justify-center rounded-full bg-gray-100 p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                                    <HeartOutlined className='text-sx hover:text-white' />
                                </div>
                            </Tooltip>
                            <Tooltip
                                placement='left'
                                className={`hidden md:flex `}
                                title={compareText}
                                arrow={mergedArrow}
                            >
                                <div className='flex items-center justify-center rounded-full bg-gray-100 p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                                    <InfoCircleOutlined className='text-sx hover:text-white' />
                                </div>
                            </Tooltip>
                            <Tooltip placement='left' className={`hidden md:flex`} title={viewText} arrow={mergedArrow}>
                                <div className='flex items-center justify-center rounded-full bg-gray-100 p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                                    <EyeOutlined className='text-sx hover:text-white' />
                                </div>
                            </Tooltip>
                        </div>
                    </Link>
                    <div className='mt-3'>
                        <h4 className='line-clamp-2 cursor-default text-ellipsis text-sm font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                            Apple iPhone 11 Pro 256GB Space Gray – Unlocked
                        </h4>
                        <div
                            className='my-2 mb-3 flex flex-wrap items-end gap-1 sm:mb-2
                        '
                        >
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <StarFilled className='text-sm text-[#FFB800]' />
                            <span className='ml-1 text-sm text-gray-500'>(1 review)</span>
                        </div>
                        <div className='mb-3 flex gap-x-2'>
                            <span className='text-base font-semibold leading-5 text-red-600'>$21000</span>
                            <del className=' text-base font-semibold leading-5 text-gray-400'>$23000</del>
                        </div>
                        <ul className='mb-5'>
                            <li>
                                <a
                                    href='#'
                                    className="relative line-clamp-1 select-none pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']"
                                >
                                    Screen Size 10.9 inch
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className="relative line-clamp-1 select-none  text-ellipsis pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']"
                                >
                                    Operating System iOS 14.0
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className="relative line-clamp-1 select-none  text-ellipsis pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']"
                                >
                                    Product Length 9.74 inch
                                </a>
                            </li>
                        </ul>
                        <div className='h-2 w-full rounded-lg bg-gray-200'>
                            <div className={`h-full w-[80%] rounded-lg bg-[#cc1414]`}></div>
                        </div>
                        <div className='text-sx mb-6 leading-8'>
                            Sold:
                            <span className='mx-1 font-semibold'>85/100</span>
                            products
                        </div>
                        <Link
                            to={`/`}
                            className='block w-full rounded-3xl border-black bg-black py-2 text-center text-sm text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                        >
                            Add to Cart
                        </Link>
                    </div>
                </div>
                <div className='absolute left-[20px] top-[20px] z-10 inline-block select-none rounded-sm bg-lime-600 px-4 text-sm leading-6 text-white'>
                    -5%
                </div>
            </div>
        </div>
    );
};

export default MediumCard;
