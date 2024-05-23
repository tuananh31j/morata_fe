import { Select } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import GridIcon from '~/components/_common/Icons/GridIcon';

interface ISortAndViewOptionsProps {
    handleClickGrid1: () => void;
    handleClickGrid2: () => void;
    handleClickGrid3: () => void;
    handleClickGrid4: () => void;
    handleClickGrid5: () => void;
}

const SortAndViewOptions: React.FC<ISortAndViewOptionsProps> = ({
    handleClickGrid1,
    handleClickGrid2,
    handleClickGrid3,
    handleClickGrid4,
    handleClickGrid5,
}) => {
    const [active, setActive] = useState<number>(4);

    const handleGrid2 = () => {
        handleClickGrid2();
        setActive(2);
    };

    const handleGrid1 = () => {
        handleClickGrid1();
        setActive(1);
    };
    const handleGrid3 = () => {
        handleClickGrid3();
        setActive(3);
    };
    const handleGrid4 = () => {
        handleClickGrid4();
        setActive(4);
    };
    const handleGrid5 = () => {
        handleClickGrid5();
        setActive(5);
    };

    return (
        <div className='flex items-center justify-between rounded-md border border-transparent bg-white p-4'>
            <div>
                <p className='text-gray-500'>113 products</p>
            </div>
            <div className='hidden items-center xl:flex xl:gap-4'>
                <button
                    onClick={handleGrid2}
                    className={clsx({ ['rounded-md bg-blue-300']: active === 2 }, 'border border-transparent p-1')}
                >
                    <GridIcon color='gray' col={2} />
                </button>
                <button
                    className={clsx({ ['rounded-md bg-blue-300']: active === 3 }, 'border border-transparent p-1')}
                    onClick={handleGrid3}
                >
                    <GridIcon color='gray' col={3} />
                </button>
                <button
                    className={clsx({ ['rounded-md bg-blue-300']: active === 4 }, 'border border-transparent p-1')}
                    onClick={handleGrid4}
                >
                    <GridIcon color='gray' col={4} />
                </button>
                <button
                    className={clsx({ ['rounded-md bg-blue-300']: active === 5 }, 'border border-transparent p-1')}
                    onClick={handleGrid5}
                >
                    <GridIcon color='gray' col={5} />
                </button>
                <button
                    className={clsx({ ['rounded-md bg-blue-300']: active === 1 }, 'border border-transparent p-1')}
                    onClick={handleGrid1}
                >
                    <GridIcon color='gray' col={1} />
                </button>
            </div>
            <Select
                style={{ width: 200 }}
                placeholder='Sort'
                optionFilterProp='children'
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                    {
                        value: '1',
                        label: 'A-Z',
                    },
                    {
                        value: '2',
                        label: 'Price',
                    },
                ]}
            />
        </div>
    );
};

export default SortAndViewOptions;
