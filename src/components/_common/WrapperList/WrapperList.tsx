import { ReactNode } from 'react';
import TitleDisplay from '../TitleDisplay';
import { cn } from '~/utils';

interface IWrapperListProps {
    children: React.ReactNode;
    title: string;
    option?: ReactNode;
    className?: string;
    border?: boolean;
    handleClick?: () => void;
}
const WrapperList: React.FC<IWrapperListProps> = ({ children, title, className, handleClick, border, option }) => {
    return (
        <div
            className={cn(
                { ['border border-transparent border-b-slate-500 border-opacity-20 pb-4']: border, ['my-20']: !border },
                'transition-all duration-300 ease-in',
                className
            )}
        >
            <TitleDisplay onClick={handleClick && handleClick} border={!border} title={title} option={option} />
            {children}
        </div>
    );
};

export default WrapperList;
