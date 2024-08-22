import { DoubleLeftOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const BackToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
            <FloatButton
                onClick={scrollToTop}
                className='h-[50px] w-[50px] hover:bg-[#16bcdc]'
                icon={<DoubleLeftOutlined className='rotate-90' />}
            ></FloatButton>
        </>
    );
};

export default BackToTop;
