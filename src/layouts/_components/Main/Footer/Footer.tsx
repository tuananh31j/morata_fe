import { BellFilled, FacebookFilled, PinterestOutlined, TikTokOutlined, TwitterOutlined } from '@ant-design/icons';
import { Collapse, ConfigProvider, Divider } from 'antd';
import { Link } from 'react-router-dom';
import useTable from '~/hooks/_common/useTable';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import { ICategory } from '~/types/Category';

const { Panel } = Collapse;

const Footer = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<ICategory>();
    const { data } = useGetCategories(query);
    const categories = data?.data?.categories;

    console.log(categories);

    return (
        <footer className='mt-5 bg-[#1f2024]'>
            <div className='mx-3 lg:mx-4'>
                {/* <div className='flex flex-col gap-2 border-y-[1px] border-[#777777] py-10 lg:flex-row lg:gap-[20px] '>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextHeading: 'white',
                                fontSize: 18,
                            },
                        }}
                    >
                        <Collapse
                            expandIconPosition={'end'}
                            defaultActiveKey={'1'}
                            ghost
                            className='w-full bg-[#525252] lg:w-[412px] lg:bg-transparent'
                            bordered={false}
                        >
                            <Panel showArrow={false} key={1} header='Download App'>
                                <p className='text-[16px] text-[#999999]'>
                                    Morata App is now available on App Store & Google Play. Get it now.
                                </p>
                                <div className='mt-[30px]'>
                                    <img
                                        loading='lazy'
                                        src='//demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=3840'
                                        alt=''
                                        srcSet='//demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=375 375w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=550 550w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=750 750w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=1100 1100w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=1500 1500w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=1780 1780w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=2000 2000w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=3000 3000w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=3840 3840w'
                                        width={382}
                                        height={45.0}
                                        sizes='100vw'
                                    />
                                </div>
                                <ul className='mt-[30px] flex gap-[10px]'>
                                    <li className='flex h-[40px] w-[40px] justify-center rounded-[10px] bg-cyan-500 text-white'>
                                        <TwitterOutlined />
                                    </li>
                                    <li className='flex h-[40px] w-[40px] justify-center rounded-[10px] bg-[#3c5b9b] text-white'>
                                        <FacebookFilled />
                                    </li>
                                    <li className='flex h-[40px] w-[40px] justify-center rounded-[10px] bg-[#e92e2e] text-white'>
                                        <PinterestOutlined />
                                    </li>

                                    <li className='flex h-[40px] w-[40px] justify-center rounded-[10px] bg-[#f6ea3c] text-white'>
                                        <BellFilled />
                                    </li>
                                    <li className='flex h-[40px] w-[40px] justify-center rounded-[10px] bg-[#ffffff]'>
                                        <TikTokOutlined />
                                    </li>
                                </ul>
                            </Panel>
                        </Collapse>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextHeading: 'white',
                                fontSize: 18,
                            },
                        }}
                    >
                        <Collapse
                            expandIconPosition={'end'}
                            defaultActiveKey={'1'}
                            ghost
                            className='w-full bg-[#525252]  lg:w-[400px] lg:bg-transparent'
                            bordered={false}
                        >
                            <Panel showArrow={false} key={1} header='My Account'>
                                <ul className='flex flex-col gap-[6px] text-[16px] text-[#999999]'>
                                    <li>
                                        <a href='/'>Product Support</a>
                                    </li>
                                    <li>
                                        <a href='/'>Checkout</a>
                                    </li>
                                    <li>
                                        <a href='/'>Shopping Cart</a>
                                    </li>
                                    <li>
                                        <a href='/'>Wishlist</a>
                                    </li>
                                    <li>
                                        <a href='/'>Custom Link</a>
                                    </li>
                                    <li>
                                        <a href='/'>Redeem Voucher</a>
                                    </li>
                                </ul>
                            </Panel>
                        </Collapse>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextHeading: 'white',
                                fontSize: 18,
                            },
                        }}
                    >
                        <Collapse
                            defaultActiveKey={'1'}
                            expandIconPosition={'end'}
                            ghost
                            className=' w-full bg-[#525252] lg:w-[400px] lg:bg-transparent'
                            bordered={false}
                        >
                            <Panel showArrow={false} key={1} header='Customer Service'>
                                <ul className='flex flex-col gap-[6px] text-[16px] text-[#999999]'>
                                    <li>
                                        <a href='/'>Help Center</a>
                                    </li>
                                    <li>
                                        <a href='/'>Contact Us</a>
                                    </li>
                                    <li>
                                        <a href='/'>Report Abuse</a>
                                    </li>
                                    <li>
                                        <a href='/'>Submit a Dispute</a>
                                    </li>
                                    <li>
                                        <a href='/'>Policies & Rules</a>
                                    </li>
                                    <li>
                                        <a href='/'>Online Returns Policy</a>
                                    </li>
                                </ul>
                            </Panel>
                        </Collapse>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextHeading: 'white',
                                fontSize: 18,
                            },
                        }}
                    >
                        <Collapse
                            defaultActiveKey={'1'}
                            expandIconPosition={'end'}
                            ghost
                            className='w-full  bg-[#525252] lg:w-[400px] lg:bg-transparent'
                            bordered={false}
                        >
                            <Panel showArrow={false} key={1} header='Help & Customer Care'>
                                <ul className='flex flex-col gap-[6px] text-[16px] text-[#777777]'>
                                    <li>
                                        <a href='/'>New Customers</a>
                                    </li>
                                    <li>
                                        <a href='/'>How to use My Account</a>
                                    </li>
                                    <li>
                                        <a href='/'>Placing an Order</a>
                                    </li>
                                    <li>
                                        <a href='/'>Payment Methods</a>
                                    </li>
                                    <li>
                                        <a href='/'>Delivery & Dispatch</a>
                                    </li>
                                    <li>
                                        <a href='/'>Problems with your Order</a>
                                    </li>
                                </ul>
                            </Panel>
                        </Collapse>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextHeading: 'white',
                                fontSize: 18,
                            },
                        }}
                    >
                        <Collapse
                            defaultActiveKey={'1'}
                            expandIconPosition={'end'}
                            ghost
                            className='w-full bg-[#525252] lg:w-[412px] lg:bg-transparent'
                            bordered={false}
                        >
                            <Panel showArrow={false} key={1} header='Sign Up To Newsletter'>
                                <p className='text-[16px] text-[#999999]'>
                                    Join 60.000+ subscribers and get a new discount coupon on every Saturday.
                                </p>
                                <div className='mt-[30px] flex h-[45px] justify-between overflow-hidden rounded-[5px] bg-white text-[13px]'>
                                    <input type='text' className='px-[15px]' placeholder='Your email address' />
                                    <button className='w-[120px] bg-cyan-500 font-semibold text-white'>
                                        SUBSCRIBE
                                    </button>
                                </div>
                                <p className='mt-[15px] text-[14px] text-[#999999]'>
                                    {' '}
                                    By providing your email address, you agree to our Privacy Policy and Terms of
                                    Service.{' '}
                                </p>
                            </Panel>
                        </Collapse>
                    </ConfigProvider>
                </div> */}

                <div className='mt-[50px] flex justify-center py-[40px]'>
                    <div className='flex flex-col'>
                        <ul className='flex flex-wrap justify-center gap-[15px] text-[12px] text-[#999999]'>
                            {/* <div className='h-[5px w-[1px] bg-[#999999]'></div>
                            <li>
                                <a href='/'>CUSTOMER SERVICE</a>
                            </li>
                            <div className='h-[5px w-[1px] bg-[#999999]'></div>
                            <li>
                                <a href='/'>PRIVACY POLICY</a>
                            </li> */}

                            {categories?.map((category) => (
                                <>
                                    <Link key={category._id} to={`/products?categoryId=${category._id}`}>
                                        <span className='text-sm capitalize hover:text-white'>{category.name}</span>
                                    </Link>

                                    <Divider type='vertical' />
                                </>
                            ))}

                            <Link to='/contact'>
                                <span className='text-sm capitalize hover:text-white'>Contact us</span>
                            </Link>
                        </ul>

                        <div className='flex justify-center py-[15px] '>
                            {/* <img
                                loading='lazy'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/payments.png?v=1698422597&width=2000'
                                alt=''
                            /> */}
                        </div>

                        <p className='text-center text-[16px] text-[#999999]'>
                            Copyright @ <span className='font-semibold text-cyan-500'>Morata</span>. All Rights
                            Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
