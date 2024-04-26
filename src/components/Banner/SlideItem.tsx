import { Button, Typography } from 'antd';
import Animation from '../Animation';
const { Title, Paragraph } = Typography;
const SlideItem = ({ status }: { status: boolean }) => {
    return (
        <div style={{ marginRight: '10px' }} className=' relative w-full'>
            <img
                className='h-full w-full rounded-xl object-cover lg:h-[300px] xl:h-[365px] 2xl:h-[440px]'
                src='https://demo-morata.myshopify.com/cdn/shop/files/banner_1_1.png?v=1697475450&width=3840'
                alt=''
            />

            <div className='absolute inset-0 flex w-[70%] flex-col items-start justify-center p-4'>
                <Animation status={status}>
                    <Title style={{ color: 'white' }} level={3} className='pb-2 text-white'>
                        Sport Edition Rest Special Edition
                    </Title>
                    <Paragraph className='text-white'>Wireless Connection with TV , Computer, Laptop ...</Paragraph>
                    <Button type='primary' className='rounded bg-black text-white'>
                        DISCOVER NOW
                    </Button>
                </Animation>
            </div>
        </div>
    );
};

export default SlideItem;
