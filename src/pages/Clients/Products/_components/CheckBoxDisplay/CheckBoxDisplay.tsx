import clsx from 'clsx';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IBrand } from '~/types/Brand';
import { ICategory } from '~/types/Category';

type ICheckBoxDisplay = {
    item: ICategory | IBrand;
    boxType?: boolean;
    colorType?: boolean;
    handleFilter: (id: string) => void;
};

const CheckBoxDisplay: React.FC<ICheckBoxDisplay> = ({ item, boxType, colorType, handleFilter }) => {
    const [active, setAcitve] = useState<boolean>(false);
    const handleActive = () => {
        setAcitve(!active);
    };
    const [searchParams] = useSearchParams();
    const cate = searchParams.get('cate');
    const isCateId = cate === item._id;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            handleFilter(e.target.value);
        } else {
            handleFilter('');
        }
        console.log(`checked = ${e.target.checked}`);
    };
    const color = colorType ? '#fff' : '';
    return (
        <div>
            <label
                onClick={handleActive}
                className={clsx(' p-2 transition-all duration-150', {
                    ['border-2']: boxType,
                    ['rounded-md border-[#1e3a8a] text-[#1e3a8a]']: (active || isCateId) && boxType,
                })}
                htmlFor={String(item.name)}
            >
                {boxType && item.name}
                {colorType && (
                    <div
                        style={{ background: color }}
                        className={clsx(
                            { ['border-gray-40000 rounded-full shadow-2xl shadow-black md:-translate-y-3']: active },
                            `box-content h-5 w-5 border-4  transition-all duration-200 ease-in-out`
                        )}
                    ></div>
                )}
            </label>
            <input className='hidden' value={item._id} id={String(item.name)} onChange={onChange} type='checkbox' />
        </div>
    );
};

export default CheckBoxDisplay;
