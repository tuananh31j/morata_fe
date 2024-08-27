import React, { ReactNode } from 'react';
import { Card, Statistic, Tooltip } from 'antd';
import { QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface CardDataStatsProps {
    title: string;
    total: number | string;
    rate?: string;
    icon: ReactNode;
    levelUp?: boolean;
    levelDown?: boolean;
    subtitle?: string;
    tooltip: string;
    rateTooltip?: string;
}

const getColorClass = (levelUp: boolean | undefined, levelDown: boolean | undefined): string => {
    if (levelUp) return 'text-green-500';
    if (levelDown) return 'text-red-500';
    return 'text-gray-500';
};

const CardDataStats: React.FC<CardDataStatsProps> = ({
    title,
    total,
    rate,
    levelUp,
    levelDown,
    icon,
    subtitle,
    tooltip,
    rateTooltip,
}) => {
    const colorClass = getColorClass(levelUp, levelDown);

    return (
        <Card className='h-40 w-full shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <div className='flex h-full flex-col'>
                <div className='mb-4 flex items-center'>
                    <div className='mr-4 text-3xl text-blue-500'>{icon}</div>
                    <div className='flex-grow'>
                        <h3 className='text-gray-800 flex items-center text-lg font-semibold'>
                            {title}
                            <Tooltip title={tooltip}>
                                <QuestionCircleOutlined className='text-gray-400 ml-2 cursor-help' />
                            </Tooltip>
                        </h3>
                        {subtitle && <p className='text-gray-500 text-sm'>{subtitle}</p>}
                    </div>
                </div>
                <div className='mt-auto'>
                    <Statistic
                        value={total}
                        className='text-2xl'
                        valueStyle={{fontWeight: 'bold', color: '#1890ff' }}
                        suffix={
                            rate && (
                                <Tooltip title={rateTooltip || 'Rate information'}>
                                    <span className={`text-sm ${colorClass} ml-2 flex cursor-help items-center`}>
                                        {rate}
                                        <InfoCircleOutlined className='ml-1' />
                                    </span>
                                </Tooltip>
                            )
                        }
                    />
                </div>
            </div>
        </Card>
    );
};

export default CardDataStats;
