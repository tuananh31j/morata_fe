import { DoubleLeftOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const BackTop = () => {
    return (
        <FloatButton.BackTop
            className='h-[50px] w-[50px] hover:bg-[#16bcdc]'
            icon={<DoubleLeftOutlined className='rotate-90' />}
        ></FloatButton.BackTop>
    );
};

export default BackTop;
