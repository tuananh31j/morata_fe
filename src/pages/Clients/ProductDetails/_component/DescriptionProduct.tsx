import { ConfigProvider, Tabs } from 'antd';

const DescriptionProduct = () => {
    return (
        <>
            <div className='product-desc  rounded-md bg-white'>
                <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                                fontSize: 18,
                                itemSelectedColor: '#16bcdc',
                                itemActiveColor: '#16bcdc',
                                itemHoverColor: '#16bcdc',
                                inkBarColor: '#16bcdc',
                            },
                        },
                    }}
                >
                    <Tabs className='w-full px-5 font-semibold ' centered={true}>
                        {/* Description */}
                        <Tabs.TabPane tab='DESCRIPTION' key='1'>
                            <div className='product-desc-content text-base text-[#777777]'>
                                <p>
                                    iPad Air with a vibrant 10.9-inch Liquid Retina display. Breakthrough Apple M1 chip
                                    for faster performance, making iPad Air super-powerful for creativity and mobile
                                    gaming. Get Touch ID, an advanced camera, lightning-fast 5G2 and Wi-Fi 6, a USB-C
                                    port, and support for the Magic Keyboard and Apple Pencil (2nd generation).
                                </p>
                                <img
                                    src='https://cdn.shopify.com/s/files/1/0836/9845/0750/files/img_content_1.jpg?v=1699289844'
                                    alt=''
                                    className='w-full py-12'
                                />
                                <h4 className='py-5 font-bold text-black'>WORK WONDERS WITH EASE</h4>
                                <p>
                                    There are so many things you can do with iPad and all the amazing apps designed for
                                    it. Now App Library automatically organizes those apps for you. And new widgets let
                                    you see information at a glance, right on your Home Screen. iPad is the world’s best
                                    note-taking device. And now Notes goes system‑wide with Quick Note, a fast and easy
                                    way to get to a note no matter what you’re doing. Highlight text in Safari or add a
                                    link from an app, and you’ll see a Quick Note thumbnail next time you visit the
                                    site, taking you right to what you were viewing before. And if you make a Quick Note
                                    on your iPad, it will be on your iPhone and Mac.
                                </p>
                                <div className='img-wrapper justify-between  py-12 lg:flex gap-5'>
                                    <div className='img-items my-2 lg:my-0'>
                                        <img
                                            src='https://cdn.shopify.com/s/files/1/0836/9845/0750/files/img_content_2.jpg?v=1699289845'
                                            alt=''
                                        />
                                    </div>
                                    <div className='img-items my-2 lg:my-0'>
                                        <img
                                            src='https://cdn.shopify.com/s/files/1/0836/9845/0750/files/img_content_3.jpg?v=1699289844'
                                            alt=''
                                        />
                                    </div>
                                    <div className='img-items my-2 lg:my-0'>
                                        <img
                                            src='https://cdn.shopify.com/s/files/1/0836/9845/0750/files/img_content_4.jpg?v=1699289844'
                                            alt=''
                                        />
                                    </div>
                                </div>
                                <h4 className='py-5 font-bold text-black'>WORK WONDERS WITH EASE</h4>
                                <p className='pb-12'>
                                    There are so many things you can do with iPad and all the amazing apps designed for
                                    it. Now App Library automatically organizes those apps for you. And new widgets let
                                    you see information at a glance, right on your Home Screen. iPad is the world’s best
                                    note-taking device. And now Notes goes system‑wide with Quick Note, a fast and easy
                                    way to get to a note no matter what you’re doing. Highlight text in Safari or add a
                                    link from an app, and you’ll see a Quick Note thumbnail next time you visit the
                                    site, taking you right to what you were viewing before. And if you make a Quick Note
                                    on your iPad, it will be on your iPhone and Mac.
                                </p>
                            </div>
                        </Tabs.TabPane>
                        {/* DDITIONAL INFORMATION */}
                        <Tabs.TabPane tab='ADDITIONAL INFORMATION' key='2'>
                            <div className='product-desc-content'>
                                <table className='w-full'>
                                    <tbody>
                                        <tr className=' even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Color</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>Space Black, Silver, Red</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Product Type</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>New, Renewed, Refurbished, Used</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Storage</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>64GB, 512GB, 2TB</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Brand</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>Apple</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Display</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>10.9‑inch Liquid Retina display with True Tone</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Capacity</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>128GB, 256GB, 512GB</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Chip (CPU)</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>Apple M1 with 8-core CPU, 8-core GPU</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Camera and Video</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>12MP – 4K Video</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Front Camera</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>12MP Ultra Wide front camera with Center Stage and Smart HDR 3</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Battery Life</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>
                                                    Up to 10 hours on Wi‑Fi, Up to 9 hours using cellular data network
                                                </p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>In the Box</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>iPad Air, USB-C Charge Cable (1 meter), 20W USB-CPower Adapter</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Height</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>9.74 inches (247.6 mm)</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Width</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>7.02 inches (178.5 mm)</p>
                                            </td>
                                        </tr>
                                        <tr className='even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Weight</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>1.0 pound (458 grams) Wi-Fi model; 1.02 pounds (462 grams) Wi-Fi</p>
                                            </td>
                                        </tr>
                                        <tr className=' even:bg-white odd:bg-gray-100'>
                                            <td className='label  pl-5 font-bold'> <h3 className='py-2'>Mobile Network</h3></td>
                                            <td className='value'>
                                                <p className='text-[#777777]'>5G</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tabs.TabPane>
                        {/* SHIPPING & RETURN */}
                        <Tabs.TabPane tab='SHIPPING & RETURN' key='3'>
                            <div className='product-desc-content text-base text-[#777777]'>
                                <h4 className='py-3 font-bold text-black'>SHIPPING</h4>
                                <ul>
                                    <li>Complimentary ground shipping within 1 to 7 business days</li>
                                    <li>In-store collection available within 1 to 7 business days</li>
                                    <li>Next-day and Express delivery options also available</li>
                                    <li>Purchases are delivered in an orange box tied with a Bolduc ribbon, with the exception of certain items</li>
                                    <li>See the delivery FAQs for details on shipping methods, costs and delivery times</li>
                                </ul>
                                <h4 className='py-3 font-bold text-black'>RETURNS AND EXCHANGES</h4>
                                <p className='pb-12'>
                                <ul>
                                    <li>Easy and complimentary, within 14 days</li>
                                    <li>See conditions and procedure in our return FAQs</li>
                                </ul>
                                </p>
                            </div>
                        </Tabs.TabPane>
                        {/* REVIEWS */}
                        <Tabs.TabPane tab='REVIEWS' key='4'>
                            <div className='product-desc-content'>
                                <p>Product Description</p>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </ConfigProvider>
            </div>
        </>
    );
};

export default DescriptionProduct;
