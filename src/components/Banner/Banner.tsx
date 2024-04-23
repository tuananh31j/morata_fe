import { Typography } from 'antd';
const { Title, Paragraph } = Typography;
import Slideshow from '../Slideshow';
const Banner = () => {
    return (
        <div className='container m-10 mx-auto'>
            <div className='mx-2 gap-3 lg:grid lg:grid-cols-2'>
                <div className='content-slide pb-2 '>
                    <Slideshow />
                </div>
                <div className='grid grid-cols-2 gap-4 '>
                    <div className='grid gap-2'>
                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
                                className=' h-full w-full transform transition-transform duration-500 group-hover:scale-110'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_1.png?v=1697473091&width=1500'
                                alt=''
                            />
                            <div className=' absolute inset-0 flex w-[80%] flex-col items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2 ' level={4}>
                                    Canyon Star Raider
                                </Title>
                                <Paragraph className='text-white'>Headphone & Audio</Paragraph>
                            </div>
                        </div>
                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
                                className=' h-full w-full transform transition-transform duration-500 group-hover:scale-110 '
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_2.png?v=1697474702&width=1500'
                                alt=''
                            />
                            <div className=' absolute inset-0 flex w-[80%] flex-col items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2' level={4}>
                                    Phone Galaxy S20
                                </Title>
                                <Paragraph className='text-white'>Cellphone & Tablets</Paragraph>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-2'>
                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
                                className=' h-full w-full transform transition-transform duration-500 group-hover:scale-110'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_3.png?v=1697474702&width=1500'
                                alt=''
                            />
                            <div className=' absolute inset-0 flex w-[80%] flex-col items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2' level={4}>
                                    Galaxy Buds Plus
                                </Title>
                                <Paragraph className='text-white'>Wireless Earbuds</Paragraph>
                            </div>
                        </div>
                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
                                className=' h-full w-full transform transition-transform duration-500 group-hover:scale-110'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_4.png?v=1697474702&width=1500'
                                alt=''
                            />
                            <div className=' absolute inset-0 flex w-[80%] flex-col  items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2' level={4}>
                                    Chair Swoon Lounge,
                                </Title>
                                <Paragraph className='text-white'>Decor & Furniture</Paragraph>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
