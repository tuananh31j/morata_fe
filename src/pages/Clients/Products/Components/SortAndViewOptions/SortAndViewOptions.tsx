import { Select } from 'antd';
import GridIcon from '~/components/Icons/GridIcon';

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
    return (
        <div className='flex items-center justify-between rounded-md border border-transparent bg-white p-4'>
            <div>
                <p className='text-gray-500'>113 products</p>
            </div>
            <div className='hidden items-center xl:flex xl:gap-4'>
                <button onClick={handleClickGrid2}>
                    <GridIcon color='gray' col={2} />
                </button>
                <button onClick={handleClickGrid3}>
                    <GridIcon color='gray' col={3} />
                </button>
                <button onClick={handleClickGrid4}>
                    <GridIcon color='gray' col={4} />
                </button>
                <button onClick={handleClickGrid5}>
                    <GridIcon color='gray' col={5} />
                </button>
                <button onClick={handleClickGrid1}>
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
