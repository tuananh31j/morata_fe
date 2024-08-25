import { HeartFilled } from '@ant-design/icons';

export default function MarqueeSlide() {
    return (
        <div className='flex h-[20px] gap-2 overflow-hidden '>
            <span className='text-white'>Các thương hiệu có trong Morata</span>
            <img
                src='https://cdn.prod.website-files.com/62b0e6308cc691625470b227/62dec0259f18b71442a15966_Apple-Logo.png'
                alt=''
            />
            <span className='text-white'>|</span>
            <img src='https://libnanews.com/wp-content/uploads/2019/10/Samsung-logo.png' alt='' className='' />
            <span className='text-white'>|</span>
            <img
                src='https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg'
                alt=''
                className=''
            />
            <span className='text-white'>|</span>
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/13/OPPO_Logo_wiki.png' alt='' className='' />
            <span className='text-white'>|</span>
            <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1024px-Dell_Logo.svg.png'
                alt=''
                className=''
            />
            <span className='text-white'>|</span>
            <img src='https://etimg.etb2bimg.com/photo/75741441.cms' alt='' className='' />
            <p className='text-white'>
                Chúng tôi hy vọng rằng mỗi lần bạn ghé thăm chúng tôi đều là một trải nghiệm đáng nhớ và tuyệt vời. Cảm
                ơn vì đã lựa chọn Morata
                <HeartFilled className='ml-1 mr-2 text-red' />
            </p>
        </div>
    );
}
