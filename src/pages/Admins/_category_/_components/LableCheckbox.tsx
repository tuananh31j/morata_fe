import { QuestionOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { cn } from '~/utils';

const LableCheckbox = ({
    title,
    isRequired,
    isVariant,
    optionsValue,
}: {
    title: string;
    isRequired: boolean;
    isVariant: boolean;
    optionsValue: string[] | number[];
}) => {
    return (
        <span className='flex items-center justify-between'>
            <p className={cn({ ['text-red']: isRequired, ['text-blue-700']: isVariant }, 'inline')}>{title}</p>
            <span>
                {optionsValue.length > 0 && (
                    <Popover
                        placement='topRight'
                        zIndex={99999999}
                        content={
                            <span className='inline-block w-[30vw] whitespace-normal break-words break-all'>
                                {optionsValue.join(', ') || 'No data for this attribute!'}
                            </span>
                        }
                        title='Dữ liệu tùy chọn của thuộc tính này bao gồm: '
                    >
                        <Button icon={<QuestionOutlined />} size='small' type='text' />
                    </Popover>
                )}
            </span>
        </span>
    );
};

export default LableCheckbox;
