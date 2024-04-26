import { DockerOutlined, EyeOutlined, FileProtectOutlined, FireFilled, HeartOutlined, MenuOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";

import ButtonBackToTop from "~/components/ButtonBackToTop";
import SmallCard from "~/components/Product/SmallCard";
import ProgressBar from "~/components/ProgressBar";
import RatingDisplay from "~/components/RatingDisplay";
import WrapperList from "~/components/WrapperList";
import DescriptionProduct from "./_component/Description/DescriptionProduct";
import ThumnailProduct from "./_component/Thumbnail/ThumnailProduct";

// demo data product gallery
const items = [
    {url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_1.jpg?v=1697644630'},
    {url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_2.jpg?v=1697644630'},
    {url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_3.jpg?v=1697644630'},
    {url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_4.jpg?v=1697644630'},
    {url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_6.jpg?v=1697644630'},
    {url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_7.jpg?v=1697644630'},
]


const ProductDetails = () => {

    return (
        <>
            {/* BeadCrumb */}
            <div className="mt-[41px]">
                {/* Product Media and detail container */}
                <div className="flex flex-col lg:flex-row gap-[10px] xl:px-[30px] xl:py-[40px]">
                    {/* Product Media */}
                    <ThumnailProduct items={items}/>
                    {/* Product Detail container */}
                    <div className="product-detail w-full">
                        {/* Title and price */}
                        <div className="product-title">
                            <h1 className="text-[#0068c9] text-2xl font-semibold">Apple iPad Air 4 10.9-inch Wi-Fi 256GB</h1>
                            <div className="product-rating  text-sm h-[49px] flex  gap-5">
                                <RatingDisplay  rating={5} reviews={100} />
                                <div className="flex mt-[10px] gap-2 items-center">
                                    <FireFilled style={{color: "red"}}/>
                                  <span>21 sold in last 24 hours</span>
                                </div>
                            </div>
                            <div className="price mt-[25px]">
                                <span className="text-3xl font-bold">$49.00</span>
                            </div>
                        </div>
                        {/* information product */}
                        <div className="information-product mt-[25px]">
                            <ul className="list-disc list-inside text-sm text-[#777777] leading-6" >
                                <li>Bass and Stereo Sound</li>
                                <li>Display with 3088 x 1440 pixels resolution.</li>
                                <li>Memory, Storage & SIM: 12GB RAM, 256GB.</li>
                            </ul>
                        </div>
                        {/* viewer now */}
                        <div className="flex gap-2 items-center mt-[29px]">
                            <span className="bg-black px-2 rounded-[50%] py-2 flex items-center justify-center"><EyeOutlined style={{color: "white", fontSize: '12px'}}/></span>
                            <span className=" text-sm">17 people are viewing this right now</span>
                        </div>
                        {/* Progress  stock product*/}
                        <div className="Progress-stock mt-[25px]">
                            <p className="text-base font-normal">Hurry Up! Only <span className="text-cyan-500">4</span> left in stock</p>
                             <ProgressBar stock={4}/>                         
                        </div>
                        {/* Produt action  */}
                        <div className="product-action  mt-[25px]">
                            {/* Button add to cart and quantity */}
                            <div className=" items-center md:flex">
                                <div className="w-[100%] lg:w-[28%] mb-[15px] md:mb-0">
                                    <Button className="h-[48px]">-</Button>
                                    <span className="px-[5px] text-base font-semibold">01</span>
                                    <Button className="h-[48px]">+</Button>
                                </div>
                                <div className="w-[100%]">
                                    <ConfigProvider theme={{
                                        components: {
                                            Button: {
                                                defaultHoverBg: '#16bcdc',
                                                defaultHoverColor: "white",
                                                defaultHoverBorderColor: "none"
                                            }
                                        }
                                    }}>
                                        <Button  size={'large'} className="h-[50px] font-bold rounded-[30px] w-[100%] hover:bg-[#16bcdc] bg-[#222222] text-white">Add to Cart</Button>

                                    </ConfigProvider>
                                </div>
                            </div>
                            {/* Button buy with pay method other */}
                            <div className="mt-[25px]">
                                    <ConfigProvider theme={{
                                        components: {
                                            Button: {
                                                defaultHoverBg: '#5a31f4',
                                                defaultHoverColor: "white",
                                                defaultHoverBorderColor: "none"
                                            }
                                        }
                                    }}>
                                        <Button  size={'large'} className="h-[50px] font-bold rounded-[30px] w-full  bg-[#5a31f4] text-white">Buy with ...</Button>

                                    </ConfigProvider>
                            </div>
                            {/* action favorite */}
                            <div className="flex gap-5 text-sm mt-[15px]">
                                <ConfigProvider theme={{components:{Button: {
                                    defaultBorderColor: 'none',
                                    defaultHoverBorderColor: 'none'
                                }}}}>
                                    <Button className="flex items-center"><HeartOutlined /> Add wishlist</Button>
                                    <Button className="flex items-center"><MenuOutlined /> Add compare</Button>
                                </ConfigProvider>
                            </div>
                            {/* Roles for COD */}
                            <div className="mt-[35px]">
                                <ConfigProvider theme={{components:{Button: {
                                    defaultBorderColor: 'none',
                                    defaultHoverBorderColor: 'none'
                                }}}}>
                                    <Button className="flex items-center text-base "><FileProtectOutlined /> Shipping and Returns</Button>
                                </ConfigProvider>
                                <div className="mt-[25px] ml-[15px]">
                                    <p><DockerOutlined /> <span className="text-[#777777]">Estimate Delivery: <b className="text-black">2 - 5 days</b></span></p>
                                    <p className="mt-[15px]"><RedoOutlined /> <span className="text-[#777777]">Return within <b className="text-black">30 days</b> of purchase. Taxes are non-refundable.</span></p>
                                </div>
                            </div>
                            {/* Availability product */}
                            <div className="mt-[35px] ml-[15px] flex flex-col gap-2">
                                <div className="flex ">
                                    <p className="text-[#777777] w-[115px]">Availability: </p>
                                    <b className="text-green-500">In Stock</b>
                                </div>
                                <div className="flex">
                                    <p className="text-[#777777]  w-[115px]">SKU: </p><span className="text-black font-semibold">N/A-01</span>
                                </div>
                                <div className="flex">
                                    <p className="text-[#777777]  w-[115px]">Vendor: </p><span className="text-black font-semibold">Apple</span>
                                </div>
                                <div className="flex">
                                    <p className="text-[#777777]  w-[115px]">Categories: </p><span className="text-black font-semibold">BestSelling, Featured Products</span>
                                </div>
                                <div className="flex">
                                    <p className="text-[#777777]  w-[115px]">Tags: </p><span className="text-black font-semibold">host, Laptop & Ipad, Smart Phones & Tablets</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <DescriptionProduct/>
                {/* WrapperList */}
                <WrapperList
                    seeMore={{ path: '', name: 'Xem Thêm' }}
                    CardItem={SmallCard}
                    title='Related Products'
                    data={[1, 2, 2, 2, 2, 2, 2, 2, 2]}
                />
                 <WrapperList
                    seeMore={{ path: '', name: 'Xem Thêm' }}
                    CardItem={SmallCard}
                    title='Recently Viewed Products'
                    data={[1, 2, 2,2,2,2,2,2,2,2]}
                />
            </div>
            {/* Button back position to top */}
            <ButtonBackToTop/>
        </>
    );
};

export default ProductDetails;
