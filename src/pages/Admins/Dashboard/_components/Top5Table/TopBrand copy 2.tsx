import WrapperList from '~/components/_common/WrapperList';

export type BRAND = {
    rank: number;
    name: string;
    products: number;
    revenues: string;
    sales: number;
};

const brandData: BRAND[] = [
    {
        rank: 1,
        name: 'Apple',
        products: 3.5,
        revenues: '5,768',
        sales: 590,
    },
    {
        rank: 2,
        name: 'Samsung',
        products: 2.2,
        revenues: '4,635',
        sales: 467,
    },
    {
        rank: 3,
        name: 'MSI',
        products: 2.1,
        revenues: '4,290',
        sales: 420,
    },
    {
        rank: 4,
        name: 'Lenovo',
        products: 1.5,
        revenues: '3,580',
        sales: 389,
    },
    {
        rank: 5,
        name: 'HP',
        products: 3.5,
        revenues: '6,768',
        sales: 390,
    },
];

const TopBrand = ({ title }: { title: string }) => {
    return (
        <WrapperList outline title={title} className=''>
            <div className='flex flex-col'>
                <div className='grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5'>
                    <div className='p-2.5 xl:p-5'>
                        <h5 className='text-sm font-medium uppercase xsm:text-base'>Rank</h5>
                    </div>
                    <div className='p-2.5 xl:p-5'>
                        <h5 className='text-sm font-medium uppercase xsm:text-base'>Name</h5>
                    </div>
                    <div className='p-2.5 text-center xl:p-5'>
                        <h5 className='text-sm font-medium uppercase xsm:text-base'>products</h5>
                    </div>
                    <div className='p-2.5 text-center xl:p-5'>
                        <h5 className='text-sm font-medium uppercase xsm:text-base'>Revenues</h5>
                    </div>
                    <div className='hidden p-2.5 text-center sm:block xl:p-5'>
                        <h5 className='text-sm font-medium uppercase xsm:text-base'>Sales</h5>
                    </div>
                </div>

                {brandData.map((brand, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${
                            key === brandData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                        }`}
                        key={key}
                    >
                        <div className='flex items-center gap-3 p-2.5 xl:p-5'>
                            <p className='hidden text-black dark:text-white sm:block'>Top {brand.rank}</p>
                        </div>
                        <div className='flex items-center gap-3 p-2.5 xl:p-5'>
                            <p className='hidden text-black dark:text-white sm:block'>{brand.name}</p>
                        </div>
                        <div className='flex items-center justify-center p-2.5 xl:p-5'>
                            <p className='text-black dark:text-white'>{brand.products}K</p>
                        </div>
                        <div className='flex items-center justify-center p-2.5 xl:p-5'>
                            <p className='text-meta-3'>${brand.revenues}</p>
                        </div>
                        <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
                            <p className='text-black dark:text-white'>{brand.sales}</p>
                        </div>
                    </div>
                ))}
            </div>
        </WrapperList>
    );
};

export default TopBrand;
