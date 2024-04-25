import { BellFilled, FacebookFilled, PinterestOutlined, TikTokOutlined, TwitterOutlined } from '@ant-design/icons';
import { Collapse, ConfigProvider } from 'antd';


const { Panel } = Collapse;


const Footer = () => {    

  return (
    <footer className='bg-[#1f2024] mt-5'>
        <div className='max-w-[1872px] mx-auto'>
            <div className='p-5 border-y-[1px] border-[#777777] lg:px-16 py-10 flex flex-col lg:flex-row gap-2 lg:gap-[20px]'>
                <ConfigProvider
                    theme={{
                        token:{
                            colorTextHeading: 'white',
                            fontSize: 18
                        }
                    }}
                >
                    <Collapse 
                    expandIconPosition={'end'}
                    defaultActiveKey={'1'}
                    ghost 
                    className='w-full lg:w-[412px] bg-[#525252] lg:bg-transparent' 
                    bordered={false} 
                    >
                            <Panel key={1}  header="Download App" >
                                <p className='text-[16px] text-[#999999]'>Morata App is now available on App Store & Google Play. Get it now.</p>
                                <div className='mt-[30px]'>
                                        <img
                                        src="//demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=3840"
                                        alt=""
                                        srcSet="//demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=375 375w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=550 550w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=750 750w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=1100 1100w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=1500 1500w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=1780 1780w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=2000 2000w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=3000 3000w, //demo-morata.myshopify.com/cdn/shop/files/app.png?v=1698465644&width=3840 3840w"
                                        width={382}
                                        height={45.0}
                                        loading="lazy"
                                
                                        sizes="100vw"
                                        />
                                </div>
                                <ul className='flex gap-[10px] mt-[30px]'>
                                    <li className='text-white w-[40px] h-[40px] flex justify-center bg-cyan-500 rounded-[10px]'><TwitterOutlined /></li>
                                    <li className='text-white w-[40px] h-[40px] flex justify-center bg-[#3c5b9b] rounded-[10px]'><FacebookFilled /></li>
                                    <li className='text-white w-[40px] h-[40px] flex justify-center bg-[#e92e2e] rounded-[10px]'><PinterestOutlined /></li>
                                    <li className='text-white w-[40px] h-[40px] flex justify-center overflow-hidden bg-[#203864] rounded-[10px]'><img src="https://cdn.freebiesupply.com/logos/large/2x/tumblr-icon-logo-png-transparent.png" alt="" /></li>
                                    <li className='text-white w-[40px] h-[40px] flex justify-center bg-[#f6ea3c] rounded-[10px]'><BellFilled /></li>
                                    <li className='w-[40px] h-[40px] flex justify-center bg-[#ffffff] rounded-[10px]'><TikTokOutlined /></li>

                                </ul>
                            </Panel>      
                    </Collapse>
                </ConfigProvider>
                <ConfigProvider
                    theme={{
                        token:{
                            colorTextHeading: 'white',
                            fontSize: 18
                        }
                    }}
                >
                    <Collapse 
                    expandIconPosition={'end'}

                    defaultActiveKey={'1'}
                    ghost 
                    className='w-full lg:w-[400px]  bg-[#525252] lg:bg-transparent' 
                    bordered={false} 
                   >
                            <Panel key={1}   header="My Account" >
                            <ul className='text-[16px] flex flex-col gap-[6px] text-[#999999]'>
                                <li><a href="">Product Support</a></li>
                                <li><a href="">Checkout</a></li>
                                <li><a href="">Shopping Cart</a></li>
                                <li><a href="">Wishlist</a></li>
                                <li><a href="">Custom Link</a></li>
                                <li><a href="">Redeem Voucher</a></li>
                            </ul>
                                
                            </Panel>      
                    </Collapse>
                </ConfigProvider>
                <ConfigProvider
                    theme={{
                        token:{
                            colorTextHeading: 'white',
                            fontSize: 18
                        }
                    }}
                >
                    <Collapse 
                    defaultActiveKey={'1'}
                    expandIconPosition={'end'}

                    ghost 
                    className=' w-full lg:w-[400px] bg-[#525252] lg:bg-transparent' 
                    bordered={false} 
                   >
                            <Panel key={1}   header="Customer Service" >
                            <ul className='text-[16px] flex flex-col gap-[6px] text-[#999999]'>
                                <li><a href="">Help Center</a></li>
                                <li><a href="">Contact Us</a></li>
                                <li><a href="">Report Abuse</a></li>
                                <li><a href="">Submit a Dispute</a></li>
                                <li><a href="">Policies & Rules</a></li>
                                <li><a href="">Online Returns Policy</a></li>
                            </ul>
                                
                            </Panel>      
                    </Collapse>
                </ConfigProvider>
                <ConfigProvider
                    theme={{
                        token:{
                            colorTextHeading: 'white',
                            fontSize: 18
                        }
                    }}
                >
                    <Collapse 
                    defaultActiveKey={'1'}
                    expandIconPosition={'end'}

                    ghost 
                    className='lg:w-[400px]  w-full lg:bg-transparent bg-[#525252]' 
                    bordered={false} 
                    >
                            <Panel key={1}   header="Help & Customer Care" >
                            <ul className='text-[16px] flex flex-col gap-[6px] text-[#777777]'>
                                <li><a href="">New Customers</a></li>
                                <li><a href="">How to use My Account</a></li>
                                <li><a href="">Placing an Order</a></li>
                                <li><a href="">Payment Methods</a></li>
                                <li><a href="">Delivery & Dispatch</a></li>
                                <li><a href="">Problems with your Order</a></li>
                            </ul>
                                
                            </Panel>      
                    </Collapse>
                </ConfigProvider>
                <ConfigProvider
                    theme={{
                        token:{
                            colorTextHeading: 'white',
                            fontSize: 18
                        }
                    }}
                >
                    <Collapse 
                    defaultActiveKey={'1'}
                    expandIconPosition={'end'}

                    ghost 
                    className='lg:w-[412px] w-full bg-[#525252] lg:bg-transparent' 
                    bordered={false} 
                    >
                            <Panel key={1}   header="Sign Up To Newsletter" >
                                <p className='text-[16px] text-[#999999]'>Join 60.000+ subscribers and get a new discount coupon on every Saturday.</p>
                                <div className='mt-[30px] bg-white flex justify-between h-[45px] rounded-[5px] overflow-hidden text-[13px]'>
                                    <input type="text" className='px-[15px]' placeholder='Your email address'/>
                                    <button className='w-[120px] bg-cyan-500 text-white font-semibold'>SUBSCRIBE</button>
                                </div>
                                <p className='text-[14px] mt-[15px] text-[#999999]'> By providing your email address, you agree to our Privacy Policy and Terms of Service. </p>
                            </Panel>     
                            
                    </Collapse>
                </ConfigProvider>
            </div>
            <div className='flex justify-center mt-[50px] pb-[50px]'>
                <div className='flex flex-col'>
                    <ul className='flex gap-[15px] flex-wrap justify-center text-[12px] text-[#999999]'>
                        <li><a href="">ABOUT US</a></li>
                        <div className='h-[5px w-[1px] bg-[#999999]'></div>
                        <li ><a href="">CUSTOMER SERVICE</a></li>
                        <div className='h-[5px w-[1px] bg-[#999999]'></div>
                        <li><a href="">PRIVACY POLICY</a></li>
                        <div className='h-[5px w-[1px] bg-[#999999]'></div>
                        <li><a href="">SITE MAP</a></li>
                        <div className='h-[5px w-[1px] bg-[#999999]'></div>
                        <li><a href="">CONTACT US</a></li>
                    </ul>
                    <div className='flex justify-center py-[35px] '>
                        <img src="https://demo-morata.myshopify.com/cdn/shop/files/payments.png?v=1698422597&width=2000" alt="" />
                    </div>
                    <p className='text-center text-[16px] text-[#999999]'>Copyright @ <span className='text-cyan-500 font-semibold'>Morata</span>. All Rights Reserved. Powered by <span className='text-cyan-500 font-semibold'>Alothemes</span></p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
