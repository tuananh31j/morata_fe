import { ArrowRightOutlined } from '@ant-design/icons';

type DropDownItemProps = {
    handleClick: () => void;
    title: string;
    lableId?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

const DropDownItem: React.FC<DropDownItemProps> = ({ handleClick, title, lableId, onMouseEnter, onMouseLeave }) => {
    if (lableId)
        return (
            <div className='my-1.5'>
                <label
                    onClick={handleClick}
                    htmlFor='test'
                    className='my-3 flex items-center justify-between gap-x-7'
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <span>{title}</span> <ArrowRightOutlined />
                </label>
            </div>
        );
    return (
        <div className='my-1.5'>
            <span
                onClick={handleClick}
                className='my-3 flex items-center justify-between gap-x-7'
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span>{title}</span> <ArrowRightOutlined />
            </span>
        </div>
    );
};

export default DropDownItem;
