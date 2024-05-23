import clsx from 'clsx';
import { useState } from 'react';

const CheckBoxDisplay: React.FC<{ lable: string | number; boxType?: boolean; colorType?: boolean }> = ({
    lable,
    boxType,
    colorType,
}) => {
    const [active, setAcitve] = useState<boolean>(false);
    const handleActive = () => {
        setAcitve(!active);
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const color = colorType ? lable : '';
    return (
        <div>
            <label
                onClick={handleActive}
                className={clsx(' p-2 transition-all duration-150', {
                    ['border-2']: boxType,
                    ['rounded-md border-[#1e3a8a] text-[#1e3a8a]']: active && boxType,
                })}
                htmlFor={String(lable)}
            >
                {boxType && lable}
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
            <input className='hidden' id={String(lable)} onChange={onChange} type='checkbox' />
        </div>
    );
};

export default CheckBoxDisplay;
