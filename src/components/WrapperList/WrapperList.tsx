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
        <div className=' my-10 transition-all duration-300 ease-in'>
            <TitleDisplay title={title} seeMore={seeMore} />
            {children}
            {/* {flex && (
                <>
                    <div className='mx-2 items-center gap-3 lg:flex'>
                        <div className='lg:w-[40%]'>
                            <Slideshow ItemCard={MediumCard} />
                        </div>
                        <div className='grid h-full flex-1 grid-cols-3 gap-4'>
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                        </div>
                    </div>
                </>
            )} */}
        </div>
    );
};

export default WrapperList;
