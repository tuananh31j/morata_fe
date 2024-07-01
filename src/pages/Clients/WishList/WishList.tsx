import SmallCard from '~/components/ProductCard/SmallCard';
import WrapperList from '~/components/_common/WrapperList';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';

const Wishlist = () => {
    useDocumentTitle('Wish list');

    return (
        <WrapperList classic title='My wishlist'>
            <p className='pb-4 text-center text-[#777777]'>
                Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas.
            </p>
            <div className=' grid grid-cols-2 gap-3 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5'>
                {/* <SmallCard />
                <SmallCard />
                <SmallCard />
                <SmallCard />
                <SmallCard /> */}
            </div>
        </WrapperList>
    );
};

export default Wishlist;
