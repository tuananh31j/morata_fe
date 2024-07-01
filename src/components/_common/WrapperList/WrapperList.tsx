import { ReactNode } from 'react';
import TitleDisplay from '../TitleDisplay';
import { cn } from '~/utils';

interface IWrapperListProps {
    children: React.ReactNode;
    title: string;
    option?: ReactNode;
    className?: string;
    outline?: boolean;
    classic?: boolean;
    lineButtonBox?: boolean;
    handleClick?: () => void;
}
const WrapperList: React.FC<IWrapperListProps> = ({
    children,
    title,
    className,
    handleClick,
    outline,
    lineButtonBox,
    classic,
    option,
}) => {
    const outlineBoxClass =
        'm-0 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1';
    const BaseClass = 'my-20 transition-all duration-300 ease-in';

    const lineButtonBoxClass = 'border border-transparent border-b-slate-500 border-opacity-20 pb-4 my-0';
    return (
        <div
            className={cn(
                { [outlineBoxClass]: outline, [BaseClass]: classic, [lineButtonBoxClass]: lineButtonBox },
                className
            )}
        >
            <TitleDisplay onClick={handleClick && handleClick} border={!lineButtonBox} title={title} option={option} />
            {children}
        </div>
    );
};

export default WrapperList;
