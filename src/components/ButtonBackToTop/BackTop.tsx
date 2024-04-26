import { DoubleLeftOutlined } from '@ant-design/icons';
import { ConfigProvider, FloatButton } from 'antd';

const BackTop = () => {
    return (
        <ConfigProvider theme={{
            token: {
                colorBgElevated: "black",
                colorText: "white"
              },
        }}>
            <FloatButton.BackTop
            className='h-[50px] w-[50px] hover:bg-[#16bcdc]'
            icon={<DoubleLeftOutlined className='rotate-90' />}
        ></FloatButton.BackTop>
        </ConfigProvider>
    );
};

export default BackTop;
