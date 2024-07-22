import { ArrowRightOutlined } from '@ant-design/icons';

const DropDownItem = ({
    handleClick,
    title,
    lableId,
}: {
    handleClick: () => void;
    title: string;
    lableId?: string;
}) => {
    if (lableId)
        return (
            <div className='my-1.5'>
                <label onClick={handleClick} htmlFor='test' className='my-3 flex items-center justify-between gap-x-7'>
                    <span>{title}</span> <ArrowRightOutlined />
                </label>
            </div>
        );
    return (
        <div className='my-1.5'>
            <span onClick={handleClick} className='my-3 flex items-center justify-between gap-x-7'>
                <span>{title}</span> <ArrowRightOutlined />
            </span>
        </div>
    );
};

export default DropDownItem;
