import { Select } from 'antd';
import GridIcon from '~/components/_common/Icons/GridIcon';
import useFilter from '~/hooks/_common/useFilter';
import { cn } from '~/utils';

const SortAndViewOptions = ({ totalProducts }: { totalProducts: number }) => {
    const { query, grid, updateQueryParam, updateGridUI } = useFilter();
    const handleGrid2 = () => {
        updateGridUI('2');
    };
    const handleGrid1 = () => {
        updateGridUI('1');
    };
    const handleGrid3 = () => {
        updateGridUI('3');
    };
    const handleGrid4 = () => {
        updateGridUI('4');
    };
    const handleGrid5 = () => {
        updateGridUI('5');
    };

    const handleSelectChange = (value: string) => {
        if (value === '-price' || value === 'price') {
            updateQueryParam({ ...query, rawsort: value, sort: '' });
        } else {
            updateQueryParam({ ...query, sort: value, rawsort: '' });
        }
    };

    return (
        <div className='flex items-center justify-between rounded-md border border-transparent bg-white p-4'>
            <div>
                <p className='text-gray-500 capitalize'>{totalProducts} Sản Phẩm</p>
            </div>
            <div className='hidden items-center xl:flex xl:gap-4'>
                <button
                    onClick={handleGrid2}
                    className={cn({ ['rounded-md bg-blue-300']: grid === '2' }, 'border border-transparent p-1')}
                >
                    <GridIcon color={grid && Number(grid) === 2 ? 'white' : 'gray'} col={2} />
                </button>
                <button
                    className={cn({ ['rounded-md bg-blue-300']: grid === '3' }, 'border border-transparent p-1')}
                    onClick={handleGrid3}
                >
                    <GridIcon color={grid && Number(grid) === 3 ? 'white' : 'gray'} col={3} />
                </button>
                <button
                    className={cn({ ['rounded-md bg-blue-300']: grid === '4' }, 'border border-transparent p-1')}
                    onClick={handleGrid4}
                >
                    <GridIcon color={grid && Number(grid) === 4 ? 'white' : 'gray'} col={4} />
                </button>
                <button
                    className={cn({ ['rounded-md bg-blue-300']: grid === '5' }, 'border border-transparent p-1')}
                    onClick={handleGrid5}
                >
                    <GridIcon color={grid && Number(grid) === 5 ? 'white' : 'gray'} col={5} />
                </button>
                <button
                    className={cn({ ['rounded-md bg-blue-300']: grid === '1' }, 'border border-transparent p-1')}
                    onClick={handleGrid1}
                >
                    <GridIcon color={grid && Number(grid) === 1 ? 'white' : 'gray'} col={1} />
                </button>
            </div>
            <Select
                style={{ width: 200 }}
                placeholder='Sort'
                optionFilterProp='children'
                onChange={handleSelectChange}
                options={[
                    {
                        value: 'name',
                        label: 'A-Z',
                        title: 'name',
                    },
                    {
                        value: '-name',
                        title: 'name',
                        label: 'Z-A',
                    },
                    {
                        value: '-price',
                        title: 'price',
                        label: 'Price desc',
                    },
                    {
                        value: 'price',
                        title: 'price',
                        label: 'Price asc',
                    },
                ]}
            />
        </div>
    );
};

export default SortAndViewOptions;
