import { Progress } from 'antd';

const ProgressBar = ({ percentageSoldProducts }: { percentageSoldProducts: number }) => {
    return (
        <>
            <Progress size={'small'} percent={percentageSoldProducts} showInfo={false} status='exception' />
        </>
    );
};

export default ProgressBar;
