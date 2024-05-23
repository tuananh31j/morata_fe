import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import clsx from 'clsx';

const SliderControls = ({
    handleNext,
    handlePrev,
    isButtonHandle,
}: {
    handleNext: () => void;
    handlePrev: () => void;
    isButtonHandle?: boolean;
}) => {
    return (
        <div
            className={clsx({
                ['hidden']: isButtonHandle,
            })}
        >
            <LeftOutlined
                onClick={handlePrev}
                className='absolute left-1 top-[50%] z-50 translate-y-[-50%] rounded-full border-transparent bg-[#222222]  p-3 text-[10px] font-extrabold text-white opacity-0 transition-all duration-700 ease-in-out hover:bg-[#16bcdc] group-hover:block group-hover:opacity-100'
            />
            <RightOutlined
                onClick={handleNext}
                className='absolute right-1 top-[50%] z-[9999999999999999999] translate-y-[-50%] rounded-full border-transparent  bg-[#222222] p-3 text-[10px] font-extrabold text-white opacity-0 transition-all duration-700 ease-in-out hover:bg-[#16bcdc] group-hover:block group-hover:opacity-100'
            />
        </div>
    );
};

export default SliderControls;
