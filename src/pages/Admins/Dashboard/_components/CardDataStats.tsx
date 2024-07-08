import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import React, { ReactNode } from 'react';
import { cn } from '~/utils';

interface CardDataStatsProps {
    title: string;
    total: string;
    rate: string;
    levelUp?: boolean;
    levelDown?: boolean;
    children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({ title, total, rate, levelUp, levelDown, children }) => {
    return (
        <div className='rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
                {children}
            </div>

            <div className='mt-4 flex items-end justify-between'>
                <div>
                    <h4 className='text-title-md font-bold text-black dark:text-white'>{total}</h4>
                    <span className='text-sm font-medium'>{title}</span>
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
};

export default CardDataStats;
