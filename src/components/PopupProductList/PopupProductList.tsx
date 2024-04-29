import { CloseOutlined } from "@ant-design/icons";
import { ConfigProvider, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "~/hooks/useWindowSize";
import SmallCard from "../Product/SmallCard";




// fake quantity data get api new product
const data= [1,1,1,1]
const PopupProductList = () => {
    const [open, setOpen] = useState(false);
    const windowsize = useWindowSize()
    useEffect(()=>{
        if(windowsize.windowWidth > 768){
            setTimeout(() => {
                setOpen(true)
            }, 7000);
        }
    },[])
  return (
    <>
    {/* ConfigProvider custom mask color */}
       <ConfigProvider theme={{token: {
          colorBgMask: 'rgba(0,0,0,0.7)'
       }}}>
            <Modal
                closeIcon={false}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={950}
                // Footer custom button view all product
                footer={[
                    <div key="cancel" className="w-full flex justify-center mb-[25px]">
                       
                        <Link to={'/productdetail'}>
                            <div className="h-[50px] w-[182px] bg-[#222222] duration-500 hover:bg-cyan-500  font-semibold text-[12px] text-white rounded-[30px] flex justify-center items-center">
                                VIEW ALL PRODUCTS
                            </div>
                        </Link>
                    </div>
                ]}
            >
                {/* closed button relative */}
                <div className="relative text-[19px] xl:w-[100%] w-full  ">
                    <CloseOutlined onClick={()=> setOpen(false)} className="absolute px-[8px] py-[8px] rounded-full cursor-pointer bg-white xl:-right-14 duration-700 hover:text-cyan-500 hover:rotate-180 -right-7 -top-14"/>
                </div>
                {/* title on modal */}
                <div>
                    <span className="text-[24px] font-medium border-b-[2px] pb-[10px] border-cyan-500">Top Pick For You</span>
                </div>
                {/* Content modal */}
                <div className="flex my-[25px]">
                  {data.map((_,index)=> index < 4 &&(
                    <SmallCard key={index}/>
                  ))}
                </div>
            </Modal>
        </ConfigProvider>
    </>
  )
}

export default PopupProductList
