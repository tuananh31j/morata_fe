import Carousel, { CarouselRef } from "antd/es/carousel";
import { useRef, useState } from "react";
import { Image } from 'antd';
// Set demo type as any
const ThumnailProduct = ({items}: any) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const ref = useRef<CarouselRef>(null);
    const onclickImage = (e: number)=>{
        setCurrentSlide(e)
        ref.current?.goTo(e, false)
    }
    const onChange = (currentSlide: number) => {
        setCurrentSlide(currentSlide)
    };
  return (
    <div className="product-thumbnail flex gap-[16px] w-full">
                        <div className="product-thumbnail-gallery hidden lg:flex flex-col gap-2 ">
                            {items?.map((item: any, index: number)=>(
                                <div  onClick={()=> onclickImage(index)} className={`border-[1px] rounded-[5px] overflow-hidden cursor-pointer ${currentSlide === index ? "border-[#777777]": ""} duration-75`}>
                                    <img className="w-[68px]" src={item.url} key={index} alt="" />
                                </div>
                            ))}
                        </div>
                        <div className="product-thumbnail-main lg:w-[375px] 2xl:w-[625px] w-[100%]">
                            <Carousel 
                            dots={false} 
                            ref={ref} 
                            draggable 
                            className="rounded-[15px] overflow-hidden"
                            beforeChange={onChange} 
                            afterChange={onChange} 
                            infinite>
                                {items?.map((item: any, index: number)=>(        
                                         <Image
                                            key={index}
                                            preview={true}
                                           
                                           src={item.url}
                                      
                                         />                           
                                ))}
                            </Carousel>
                        </div>
                    </div>
  )
}

export default ThumnailProduct
