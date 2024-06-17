'use client';

import React from 'react';

interface StatsCardProps {
    title: string;
    amount: string;
    percentage: number;
    since: string;
    icon: React.ReactNode;
    bgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, amount, percentage, since, icon: Icon, bgColor }) => {
    return (
        <div className=''>
            <div className='rounded-2xl bg-white shadow-xl'>
                <div className='px-4 py-5'>
                    <div>
                        <div className='flex justify-between'>
                            <div className=''>
                                <div>
                                    <p className='mb-0 font-sans text-sm font-semibold uppercase leading-normal opacity-70 '>
                                        {title}
                                    </p>
                                    <h5 className='mb-2 mt-2 text-xl font-bold text-slate-600'>{amount}</h5>
                                </div>
                            </div>
                            <div className='ml-4 flex items-center justify-center pb-2'>
                                <div className={`rounded-full ${bgColor} px-4 py-3 `}> {Icon}</div>
                            </div>
                        </div>
                        <div>
                            <p className='mb-0 text-lg opacity-60'>
                                <span
                                    className={`mr-1 text-sm font-bold leading-normal ${percentage > 0 ? 'text-emerald-500' : 'text-red-600'}`}
                                >
                                    {percentage}%
                                </span>
                                {since}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
