import WrapperList from '~/components/_common/WrapperList';
import HeadItem from './HeadItem';
import { ReactNode } from 'react';

const TableDisplay = ({ title, headsList, children }: { title: string; headsList: string[]; children: ReactNode }) => {
    return (
        <WrapperList outline title={title} className=''>
            <div className='flex flex-col'>
                <div className='grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5'>
                    {headsList.map((item, i) => (
                        <HeadItem key={i} title={item} />
                    ))}
                </div>

                {children}
            </div>
        </WrapperList>
    );
};

export default TableDisplay;
