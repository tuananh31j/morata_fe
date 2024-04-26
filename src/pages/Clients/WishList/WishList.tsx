import BreadCrumb from '~/components/Breadcrumb/Breadcrumb';
import SmallCard from '~/components/Product/SmallCard';

const Wishlist = () => {
    return (
        <section className='py-4'>
            <BreadCrumb />
            <h1 className='my-4 text-[26px]'>
                <span className='border-b-[2px] border-[#16bcdc] pb-3'>Your Favourite Product</span>
            </h1>
            <p className='pb-4 text-center text-[#777777]'>
                Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas.
            </p>
            <div className=' grid grid-cols-2 gap-3 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5'>
                <SmallCard />
                <SmallCard />
                <SmallCard />
                <SmallCard />
                <SmallCard />
            </div>
        </section>
    );
};

export default Wishlist;
