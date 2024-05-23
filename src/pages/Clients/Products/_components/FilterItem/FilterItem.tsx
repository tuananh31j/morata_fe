import WrapperList from '~/components/_common/WrapperList';
import CheckBoxDisplay from '../CheckBoxDisplay';
import { useState } from 'react';
import clsx from 'clsx';

const FilterItem = ({
    data,
    filterType,
    boxType,
    colorType,
    children,
}: {
    data?: number[] | string[];
    filterType: string;
    boxType?: boolean;
    colorType?: boolean;
    children?: React.ReactNode;
}) => {
    const [isFilter, setIsFilter] = useState<boolean>(false);

    const handleClick = () => {
        console.log('ok');
        setIsFilter(!isFilter);
    };
    return (
        <WrapperList border handleClick={handleClick} title={filterType}>
            {!children && data && (
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
                        <CheckBoxDisplay boxType={boxType} colorType={colorType} lable={item} key={i} />
                    ))}
                </div>
            )}

            <div className={clsx({ ['hidden']: isFilter })}>{children && children}</div>
        </WrapperList>
    );
};

export default FilterItem;
