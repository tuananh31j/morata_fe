import { FC, ReactNode } from 'react';

type IColItem = {
    classic?: boolean;
    children: ReactNode;
};
const ColItem: FC<IColItem> = ({ classic, children }) => {
    return (
        <div className='flex items-center gap-3 p-2.5 xl:p-5'>
            {classic && <p className='hidden text-black dark:text-white sm:block'>{children}</p>}
            {!classic && children}
        </div>
    );
};

export default ColItem;
