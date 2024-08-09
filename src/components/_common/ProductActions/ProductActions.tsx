import { HeartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const ProductActions = ({ alignLeft }: { alignLeft: number }) => {
    return (
        <div
            className={`absolute right-[12px] top-1 z-10 gap-3 opacity-0 transition-opacity duration-300 ease-linear group-data-[active=card]:opacity-100 md:left-[${alignLeft}%] md:right-[unset] md:flex md:translate-x-3/4 md:flex-col`}
        >
            <Tooltip placement='left' title='Add to wishlist' arrow={true}>
                <div className='bg-gray-100 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                    <HeartOutlined className='text-[12px] hover:text-white' />
                </div>
            </Tooltip>

            <Tooltip placement='left' className='hidden md:flex' title='Add to compare' arrow={true}>
                <div className='bg-gray-100 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                    <InfoCircleOutlined className='text-[12px] hover:text-white' />
                </div>
            </Tooltip>

            {/* <Tooltip placement='left' className='hidden md:flex' title='Quick view' arrow={true}>
                <div className='bg-gray-100 flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-linear hover:border-[#16bcdc] hover:bg-[#16bcdc] hover:text-white hover:duration-300 hover:ease-linear '>
                    <EyeOutlined className='text-[12px] hover:text-white' />
                </div>
            </Tooltip> */}
        </div>
    );
};

export default ProductActions;
