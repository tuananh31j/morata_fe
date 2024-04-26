import TitleDisplay from '../TitleDisplay';

interface IWrapperListProps {
    children: React.ReactNode;
    title: string;
    flex?: boolean;
    seeMore?: { path: string; name: string };
    propsCard?: { flex?: boolean };
}
const WrapperList: React.FC<IWrapperListProps> = ({ children, title, flex, seeMore }) => {
    return (
        <div className='my-20 transition-all duration-300 ease-in'>
            <TitleDisplay title={title} seeMore={seeMore} />
            {children}
        </div>
    );
};

export default WrapperList;
