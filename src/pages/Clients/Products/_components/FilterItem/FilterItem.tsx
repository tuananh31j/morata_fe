import WrapperList from '~/components/_common/WrapperList';
import CheckBoxDisplay from '../CheckBoxDisplay';
import { useState } from 'react';
import clsx from 'clsx';
import { ICategory } from '~/types/Category';
import { IBrand } from '~/types/Brand';

const FilterItem = ({
    data,
    filterName,
    boxType,
    colorType,
    children,
    handleFilter,
}: {
    data?: IBrand[] | ICategory[];
    filterName: string;
    boxType?: boolean;
    colorType?: boolean;
    children?: React.ReactNode;
    handleFilter?: (id: string) => void;
}) => {
    const [isFilter, setIsFilter] = useState<boolean>(false);

    const handleClick = () => {
        setIsFilter(!isFilter);
    };
    return (
        <WrapperList border handleClick={handleClick} title={filterName}>
            {!children && handleFilter && data && (
                <div
                    className={clsx(
                        {
                            ['hidden']: isFilter,
                            ['flex flex-wrap gap-x-2 gap-y-6']: !isFilter && boxType,
                            ['grid grid-cols-5  gap-x-2']: !isFilter && colorType,
                        },
                        'my-5 max-h-[600px]'
                    )}
                >
                    {data.map((item, i) => (
                        <CheckBoxDisplay
                            handleFilter={handleFilter}
                            boxType={boxType}
                            colorType={colorType}
                            item={item}
                            key={i}
                        />
                    ))}
                </div>
            )}

            <div className={clsx({ ['hidden']: isFilter })}>{children && children}</div>
        </WrapperList>
    );
};

export default FilterItem;
