import { Button, ConfigProvider, Form, Input, Radio, Select, Space } from "antd"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const demoDataProduct = [
    {
        id: "kaslndlkasnd",
        title: "Blink Home Security Camera System",
        image: "https://cdn.shopify.com/s/files/1/0836/9845/0750/files/55_64x64.png?v=1702563441",
        price: 162,
        quantity: 1
    },
    {
        id:"asdasdasdsad",
        title: "Apple iPhone 11 Pro 256GB Space Gray – Unlocked",
        price: 210,
        image: "https://cdn.shopify.com/s/files/1/0836/9845/0750/products/products_5_1_64x64.jpg?v=1697644653",
        quantity: 1
    },
]


const CheckOut = () => {
    // demo use hook useState
    const [address, setAddress] = useState('')
    const navigate = useNavigate()
    const handleOnsubmit = (value: any)=>{
        if(value.payMethod === "PayOnline"){
            navigate('/online')
        }
        console.log({...value, demoDataProduct})
    }
    const totalOrderAmount = demoDataProduct.reduce((total, product) => total + product.price * product.quantity, 0);
    const getvalueShipping = (value: string)=>{
        setAddress(value)
    }
  return (
    
    <>
        <div className="max-w-[1280px] mx-auto mt-[5px]">
            <Link to={'/'} className="font-bold hover:text-cyan-500 duration-300">&lt; Back To Home</Link>
        </div>
        <div  className="flex flex-col-reverse md:flex-row mt-[25px] mx-auto gap-10 max-w-[1280px]">
           <div className="border-[1px] border-[#7777] rounded-lg p-5 w-full">
           <Form  name="checkout" onFinish={handleOnsubmit} layout="vertical"  style={{ maxWidth: 600 }}>
                <h3 className="font-semibold text-[21px]">Contact</h3>
                <div className="mt-[15px]">
                        <Form.Item label="Email or phone number"  name="emailorphone" rules={[{ required: true, message: 'Enter an email or phone number' }]}>
                            <Input placeholder="Email or phone number" className="h-[48px] mt-[5px]"/>
                        </Form.Item>
                </div>
                <h3 className="font-semibold text-[21px]">Delivery</h3>
                
                <div className=" flex justify-between gap-5 mt-[15px]">
                        <Form.Item label="First Name" className="w-full" name="firstName" rules={[{ required: true, message: 'Enter an email or phone number' }]}>
                            <Input placeholder="Enter your first name" className="h-[48px] mt-[5px]"/>
                        </Form.Item>
                        <Form.Item label="Last Name" className="w-full"  name="lastName" rules={[{ required: true, message: 'Enter an email or phone number' }]}>
                            <Input placeholder="Enter your last name" className="h-[48px] mt-[5px]"/>
                        </Form.Item>
                </div>
                <div className="">
                    <Form.Item
                        name="country"
                        label="Country"
                        rules={[{ required: true, message: 'Please select gender!' }]}
                    >
                        <Select placeholder="select your country" className="h-[48px]">
                            <Select.Option value="vn">Viet Nam</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="">
                        <Form.Item label="City"  name="city" rules={[{ required: true, message: 'Enter an email or phone number' }]}>
                            <Select placeholder="select your city" className="h-[48px]">
                                <Select.Option value="HaNoi">Ha Noi</Select.Option>
                                <Select.Option value="HoChiMinh">Ho Chi Minh</Select.Option>
                            </Select>
                        </Form.Item>
                </div>
                <div className="">
                        <Form.Item label="Address"  name="address" rules={[{ required: true, message: 'Enter an email or phone number' }]}>
                            <Input onChange={(e)=> getvalueShipping(e.target.value)} placeholder="Address" className="h-[48px] mt-[5px]"/>
                        </Form.Item>
                </div>
                <div className="">
                        <Form.Item label="Apartment / suite/ etc"  name="apartment" rules={[{ required: true, message: 'Enter an email or phone number' }]}>
                            <Input placeholder="Apartment, suite, etc. (optional)" className="h-[48px] mt-[5px]"/>
                        </Form.Item>
                </div>
                <div>
                    <Form.Item name="payMethod" label="Pay Methods" rules={[{ required: true, message: 'Please chose your pay method' }]}>
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={"COD"}>Cash on delivery - COD</Radio>
                                <Radio value={"PayOnline"}>Pay Online</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className="mt-[35px]">
                    <ConfigProvider theme={{
                        components: {
                            Button: {
                                defaultBg: "#3c535e",
                                defaultHoverBg: "#2a3b44",
                                defaultHoverBorderColor: "none"
                            }
                        }
                    }}>
                        <Button  htmlType="submit" className="w-full text-[16px] font-semibold text-white h-[58px]">
                            Order Now
                        </Button>
                    </ConfigProvider>
                </div>
            </Form>
           </div>
            <div className=" w-full">
                <div className="flex flex-col gap-[15px] px-5 -order-1 ">
                    {demoDataProduct.map((item, index)=>(
                        <div key={index} className="flex items-center gap-[14px]">
                            <div className="relative border-[1px]  border-[#7777] rounded-[2px]">
                                <img src={item.image} alt="" />
                                <span style={{backgroundColor: "rgba(0,0,0, 0.58)"}} className="absolute px-[9px] font-semibold text-white py-[2px] text-[12px] rounded-full -top-3 z-10 -right-3">{item.quantity}</span>
                            </div>
                            <div className="w-full">
                                <span className="text-[14px]">{item.title}</span>
                            </div>
                            <div>
                                <span className="text-[14px]">${item.price}</span>
                            </div>
                        </div>
                    ))}
                    <div className="mt-[44px]">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[14px]">Subtotal</h3>
                            <span>${totalOrderAmount}</span>
                        </div>
                        <div className="flex mt-[12px] justify-between items-center">
                            <h3 className="text-[14px]">Shipping </h3>
                            <span className="text-[14px] text-[#777777]">{address ? address : "Enter your address"}</span>
                        </div>
                        <div className="flex mt-[12px] justify-between ">
                            <h3 className="text-[19px] font-medium">Total </h3>
                            <span className="text-[19px] font-medium"><span className="text-[#777777] text-[12px]">CAD</span> ${totalOrderAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CheckOut
