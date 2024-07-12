import { Tag } from 'antd';

const IsPaidTag = ({ isPaid }: { isPaid: boolean }) => {
    return <Tag color={isPaid ? 'green' : 'red'}>{isPaid ? 'Paid' : 'Not paid'}</Tag>;
};

export default IsPaidTag;
