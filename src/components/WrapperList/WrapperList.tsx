import clsx from 'clsx';
import TitleDisplay from '../TitleDisplay';

interface IWrapperListProps {
    children: React.ReactNode;
    title: string;
    seeMore?: { path?: string; name: string };
    className?: string;
    border?: boolean;
    handleClick?: () => void;
}
const WrapperList: React.FC<IWrapperListProps> = ({ children, title, className, handleClick, border, seeMore }) => {
    return (
        <div
            className={clsx(
                { ['border border-transparent border-b-gray-600 border-opacity-20 pb-4']: border, ['my-20']: !border },
                'transition-all duration-300 ease-in',
                className
            )}
        >
            <TitleDisplay onClick={handleClick && handleClick} border={!border} title={title} seeMore={seeMore} />
            {children}
        </div>
    );
};

export default WrapperList;
