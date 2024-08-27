import { message } from 'antd';

export type IMessageProps = {
    content: string;
    type: 'success' | 'error' | 'warning' | 'loading';
};

const useMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const handleMessage = ({ content, type }: IMessageProps) => {
        messageApi.open({
            type,
            content,
        });
    };
    return { handleMessage, contextHolder };
};

export default useMessage;
