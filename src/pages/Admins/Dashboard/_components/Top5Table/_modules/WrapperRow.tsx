import { ReactNode } from 'react';

const WrapperRow = ({ children }: { children: ReactNode }) => {
    return <div className={`grid grid-cols-3 sm:grid-cols-5`}>{children}</div>;
};

export default WrapperRow;
