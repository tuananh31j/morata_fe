import { Button, Typography } from 'antd';
import Animation from '../_common/Animation';

const { Title, Paragraph } = Typography;
const SlideItem = ({
    status,
    product,
}: {
    status?: boolean;
    product?: {
        image: string;
        title: string;
        description: string;
    };
}) => {
    return (
        <div
            style={{ marginRight: '10px' }}
            className=' relative flex h-full w-full flex-col items-center justify-center'
        >
            <img
                loading='lazy'
                className='h-80 w-full rounded-xl object-cover lg:h-[300px] xl:h-[365px] 2xl:h-[440px]'
                src={product?.image}
                alt=''
            />

            <div className='absolute inset-0 flex w-[70%] flex-col items-start justify-center p-4'>
                {/* <Animation status={status}> */}
                <Title style={{ color: 'white' }} level={3} className='pb-2 text-white'>
                    {product?.title}
                </Title>

                <Paragraph className='text-white'>{product?.description}</Paragraph>
                {/* </Animation> */}
            </div>
        </div>
    );
};

export default SlideItem;
