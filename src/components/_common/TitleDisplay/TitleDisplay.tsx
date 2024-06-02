import { MinusOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TitleDisplay = ({
    seeMore,
    title,
    border,
    onClick,
}: {
    title: string;
    onClick?: () => void;
    border?: boolean;
    seeMore?: { path?: string; name: string };
}) => {
    const [status, setStatus] = useState<boolean>(false);
    const handleClick = () => {
        if (onClick) {
            onClick();
            setStatus(!status);
        }
    };
    return (
        <div
            onClick={handleClick}
            className={clsx({ ['border-b-[1.5px]']: border }, 'mb-5 flex items-center justify-between')}
        >
            <div className='inline-block border-b-[1.5px] border-[#16bcdc] py-[4px]  text-start md:border-b-[2.3px]'>
                <span className='flex items-center gap-3'>
                    {!status && !!onClick && <MinusOutlined />}
                    {status && <PlusOutlined />}
                    <h1 className='text-start font-[400] capitalize md:text-[20px]'>{title}</h1>
                </span>
            </div>
            <div className='flex items-center'>
                {!!seeMore && seeMore.path && (
                    <Link
                        to={seeMore.path}
                        className='text-[10px] font-[500] capitalize leading-6 duration-500 hover:text-blue-800 md:text-[14px]'
                    >
                        {seeMore.name} <RightOutlined className='text-[7px] md:text-[10px]' />
                    </Link>
                )}
                {!!seeMore && !seeMore.path && (
                    <button className='text-[10px] font-[500] capitalize duration-500 hover:text-blue-800 md:text-[14px]'>
                        {seeMore.name} <RightOutlined className='text-[7px] md:text-[10px]' />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TitleDisplay;
