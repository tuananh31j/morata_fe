import WrapperList from '~/components/_common/WrapperList';
import { useState } from 'react';
import clsx from 'clsx';

const FilterWrap = ({ filterName, children }: { filterName: string; children: React.ReactNode }) => {
    const [isFilter, setIsFilter] = useState<boolean>(false);

    const handleClick = () => {
        setIsFilter(!isFilter);
    };
    return (
        <WrapperList lineButtonBox handleClick={handleClick} title={filterName}>
            <div className={clsx({ ['hidden']: isFilter })}>{children}</div>
        </WrapperList>
    );
};

export default FilterWrap;
