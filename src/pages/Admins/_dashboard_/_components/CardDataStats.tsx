import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { forwardRef, HTMLAttributes, ReactNode, useState } from 'react';
import { cn } from '~/utils';

interface CardDataStatsProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    total: string;
    rate: string;
    colorBorderActive: string;
    levelUp?: boolean;
    levelDown?: boolean;
    children: ReactNode;
}

const CardDataStats = forwardRef<HTMLDivElement, CardDataStatsProps>(
    ({ title, total, rate, levelUp, levelDown, colorBorderActive, children, ...props }, ref) => {
        const [isActive, setIsActive] = useState(false);
        return (
            <div
                onClick={() => setIsActive(!isActive)}
                {...props}
                ref={ref}
                style={{ borderColor: isActive ? colorBorderActive : 'white' }}
                className='rounded-lg border-t-4 bg-white px-7.5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark'
            >
                <div className=''>
                    <h1 className='text-sm font-medium'>{title}</h1>
                </div>

                <div className='mt-4 flex items-end justify-between'>
                    <div>
                        <h4 className='text-title-md font-bold text-black dark:text-white'>{total}</h4>
                    </div>

                    <span
                        className={cn('flex items-center gap-1 text-sm font-medium', {
                            ['text-meta-3']: levelUp,
                            ['text-meta-5']: levelDown,
                        })}
                    >
                        {rate}
                        {levelUp && <ArrowUpOutlined className='text-green-500' />}
                        {levelDown && <ArrowDownOutlined className='fill-meta-5' />}
                    </span>
                </div>
            </div>
        );
    }
);
CardDataStats.displayName = 'CardDataStats';

export default CardDataStats;
