import { Tag } from 'antd';
import { PaymentMethod } from '~/constants/enum';

const PaymentMethodTag = ({ method }: { method: PaymentMethod }) => {
    return <Tag color={method === PaymentMethod.card ? 'green' : 'red'}>{method}</Tag>;
};

export default PaymentMethodTag;
