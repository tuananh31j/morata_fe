import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import useFilter from '~/hooks/_common/useFilter';

const MenuItem = ({ name, id, isBrand }: { name: string; id: string; isBrand?: boolean }) => {
    const { updateQueryParam } = useFilter();
    return (
        <>
            {!isBrand && (
                <Link
                    onClick={() => updateQueryParam({ categoryId: id })}
                    to={`${MAIN_ROUTES.PRODUCTS}?categoryId=${id}`}
                    className='p-1 text-[16px] font-semibold uppercase hover:bg-black'
                >
                    <span className='pe-4 text-white'>{name}</span>
                </Link>
            )}
            {isBrand && (
                <Link
                    onClick={() => updateQueryParam({ brandId: id })}
                    to={`${MAIN_ROUTES.PRODUCTS}?brandId=${id}`}
                    className='p-1 text-[16px] font-semibold uppercase hover:bg-black'
                >
                    <span className='pe-4 text-white'>{name}</span>
                </Link>
            )}
        </>
    );
};

export default MenuItem;
