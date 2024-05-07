import {  ConfigProvider, Form, Input } from "antd"
import { useState } from "react"
import { motion } from 'framer-motion';
import { Link } from "react-router-dom"

const LoginPage = () => {
    const [isRegisterMode, setRegisterMode] = useState(false)
    const handleSubmit = (value: any)=>{
        if(!isRegisterMode){
            console.log(value)
        }
        else{
            console.log(value)
        }
    }
  return (
    <>
      <div className=" max-w-[1668px] mb-[105px] flex  mx-auto "> 
        <div className="flex w-full bg-white h-[616px] shadow-lg justify-center items-center rounded-[15px]">
                <div className="hidden w-full xl:flex flex-col items-center px-[5%] select-none">
                    <div className="relative">
                        <img src="https://pngimg.com/d/laptop_PNG101814.png"  loading="lazy" width={550} alt="" />
                        <img className=" px-2 py-5 absolute top-[28%] left-[32%] " src="https://demo-morata.myshopify.com/cdn/shop/files/logo_150x@2x.png?v=1697202938" loading="lazy" alt="" />
                    </div>
                    <h3 className="text-[28px] xl:text-2xl text-[#1e3a8a] font-semibold">Unleash Your Potential With Our Powerful Laptops</h3>
                </div>
                <div className="bg-white w-full h-full rounded-[15px]">
                    <div className="flex justify-between  px-5 py-5">
                        <button onClick={()=> setRegisterMode(false)} className={`w-full font-medium border-b-4 pb-[15px] duration-500 ${isRegisterMode ? "border-[#7777]": "border-cyan-500"}`}>LOGIN</button>
                        <button onClick={()=> setRegisterMode(true)} className={`w-full font-medium border-b-4 pb-[15px] duration-500 ${isRegisterMode ? "border-cyan-500": "border-[#7777]"}`}>REGISTER</button>
                    </div>
                    {!isRegisterMode &&
                        <motion.div 
                        initial={{  opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1,}}
                        className="bg-white flex justify-center p-5 w-full xl:w-full">
                            <ConfigProvider theme={{token: {
                                colorBorder: 'rgba(0,0,0,0.3)'
                            }}}>
                                <Form onFinish={handleSubmit} className="w-full">
                                    <h1 className=" font-bold text-[38px] mb-[35px]">LOGIN</h1>
                                    <Form.Item
                                    name={'email'}
                                    rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                                    >
                                        <Input className="h-[48px] rounded-[2px] mb-1 font-semibold" placeholder="Email Address" />
                                    </Form.Item>
                                    <Form.Item
                                        name={'password'}
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >   
                                        <Input.Password className="h-[48px] rounded-[2px] mb-1 font-semibold" placeholder="Password"/>
                                    </Form.Item>
                                    <div className="mt-[35px]">
                                        <Link to={''}>Forgot your password?</Link>
                                    </div>
                                    <Form.Item className="mt-[15px]">
                                        <button type="submit" className="h-[48px] w-full bg-[#222222] text-white font-medium rounded-[5px] hover:bg-cyan-500 duration-300">LOGIN</button>
                                    </Form.Item>
                                  
                                </Form>
                            </ConfigProvider>
                        </motion.div>
                    }
                    {isRegisterMode &&
                         <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{  opacity: 1 }}
                         transition={{ duration: 1,}}
                         className="bg-white flex justify-center p-5 w-full xl:w-full">
                            <ConfigProvider theme={{token: {
                                colorBorder: 'rgba(0,0,0,0.3)'
                            }}}>
                                <Form onFinish={handleSubmit} className="w-full">
                                    <h1 className=" font-bold text-[38px] mb-[35px]">REGISTER</h1>
                                    <div className="flex justify-between gap-5">
                                        <Form.Item className="w-full"
                                        name={'firstName'}
                                        rules={[{ required: true, message: 'Please input your First Name!' }]}
                                        >
                                            <Input className="h-[48px] rounded-[2px] font-semibold" placeholder="First Name" />

                                        </Form.Item>
                                        <Form.Item className="w-full"
                                         name={'lastName'}
                                         rules={[{ required: true, message: 'Please input your Last Name!' }]}
                                         >
                                        <Input className="h-[48px] rounded-[2px] font-semibold" placeholder="Last Name" />

                                        </Form.Item>
                                    </div>
                                    <Form.Item
                                    name={'email'}
                                    rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                                    >
                                        <Input className="h-[48px] rounded-[2px] font-semibold" placeholder="Email Address" />
                                    </Form.Item>
                                    <Form.Item
                                      name={'password'}
                                      rules={[{ required: true, message: 'Please input your password!' }]}>
                                        <Input.Password className="h-[48px] rounded-[2px] font-semibold" placeholder="Password"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <button type="submit" className="h-[48px] mt-[65px] w-full bg-[#222222] text-white font-medium rounded-[5px] hover:bg-cyan-500 duration-300">REGISTER</button>
                                    </Form.Item>
                                    
                                </Form>
                            </ConfigProvider>
                        </motion.div>
                    }
                </div>
            </div>
      </div>
    </>
  )
}

export default LoginPage
