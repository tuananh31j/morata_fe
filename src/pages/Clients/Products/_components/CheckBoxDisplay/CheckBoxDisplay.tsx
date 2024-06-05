import clsx from 'clsx';
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
    const [searchParams] = useSearchParams();
    const cateId = searchParams.get('categoryId');
    const brandId = searchParams.get('brandId');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            handleFilter(e.target.value);
        } else {
            handleFilter('');
        }
    };
    // const color = colorType ? '#fff' : '';
    return (
        <div>
            <label
                className={clsx(' p-2 transition-all duration-150', {
                    ['border-2']: boxType,
                    ['rounded-md border-[#1e3a8a] text-[#1e3a8a]']:
                        (cateId === item._id || brandId === item._id) && boxType,
                })}
                htmlFor={String(item.name)}
            >
                {boxType && item.name}
                {/* {colorType && (
                    <div
                        style={{ background: color }}
                        className={clsx(
                            { ['border-gray-40000 rounded-full shadow-2xl shadow-black md:-translate-y-3']: active },
                            `box-content h-5 w-5 border-4  transition-all duration-200 ease-in-out`
                        )}
                    ></div>
                )} */}
            </label>
            <input className='hidden' value={item._id} id={String(item.name)} onChange={onChange} type='radio' />
        </div>
    );
};

export default CheckBoxDisplay;
