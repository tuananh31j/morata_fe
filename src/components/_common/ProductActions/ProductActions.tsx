import { EyeOutlined, HeartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const ProductActions = () => {
    const favoriteText = <span>Add wishlist</span>;
    const compareText = <span>Add compare</span>;
    const viewText = <span>Quick view</span>;
    return (
        <div className='absolute right-[12px] top-1  z-10 gap-3 opacity-0 transition-opacity duration-300 ease-linear group-data-[active=card]:opacity-100 md:left-[65%] md:right-[unset]  md:flex md:translate-x-3/4 md:flex-col'>
            <Tooltip placement='left' title={favoriteText} arrow={true}>
                <div className='bg-gray-100 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                    <HeartOutlined className='text-[12px] hover:text-white' />
                </div>
            </Tooltip>
            <Tooltip placement='left' className='hidden md:flex' title={compareText} arrow={true}>
                <div className='bg-gray-100 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                    <InfoCircleOutlined className='text-[12px] hover:text-white' />
                </div>
            </Tooltip>
            <Tooltip placement='left' className='hidden md:flex' title={viewText} arrow={true}>
                <div className='bg-gray-100 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                    <EyeOutlined className='text-[12px] hover:text-white' />
                </div>
            </Tooltip>
        </div>
    );
};

export default ProductActions;
