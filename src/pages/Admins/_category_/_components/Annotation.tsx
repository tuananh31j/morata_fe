import { Tag } from 'antd';
import { IValueCheckbox } from '~/types/Category';

const Annotation = ({ attributeChecked }: { attributeChecked: IValueCheckbox[] }) => {
    return (
        <div className='sticky right-0 top-10 '>
            <div className='my-10 mt-0 rounded-md border border-transparent p-2 shadow-md'>
                <h3 className='my-2 text-xl font-medium text-primary'>Chú thích</h3>
                <div className='flex flex-col gap-2 text-sm font-semibold'>
                    <p>
                        <span className=''>Đen:</span> Thuộc tính chung cho toàn bộ một sản phẩm
                    </p>
                    <p>
                        <span className='text-red'>Đỏ:</span> Thuộc tính yêu cầu bắt buộc nhập cho sản phẩm
                    </p>
                    <p>
                        <span className='text-blue-700'>Xanh:</span> Thuộc tính được thêm khi tạo mới biến thể
                    </p>
                </div>
            </div>
            <div className='inline'>
                {attributeChecked.map((attr, i) => (
                    <Tag
                        className='my-1'
                        // onClose={() => handleCloseTag(attr.value)}
                        key={i}
                        bordered={true}
                        // closable
                    >
                        {attr.name}
                    </Tag>
                ))}
            </div>
        </div>
    );
};

export default Annotation;
