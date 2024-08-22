import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import useFilter from '~/hooks/_common/useFilter';

const MenuItem = ({ name, id }: { name: string; id: string }) => {
    const { updateQueryParam } = useFilter();
    return (
        <Link
            onClick={() => updateQueryParam({ categoryId: id })}
            to={`${MAIN_ROUTES.PRODUCTS}?categoryId=${id}`}
            className='p-1 text-[16px] font-semibold uppercase hover:bg-black'
        >
            <span className='pe-4 text-white'>{name}</span>
        </Link>
    );
};

export default MenuItem;
