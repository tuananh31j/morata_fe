import { WarningOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

type IModalDelete = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    confirmLoading: boolean;
    handleDeleteProduct: () => void;
};

const ModalDelete = ({ isModalOpen, handleOk, handleCancel, confirmLoading, handleDeleteProduct }: IModalDelete) => {
    return (
        <Modal
            title={
                <div>
                    <WarningOutlined className='text-yellow-500' style={{ fontSize: '1.5rem' }} />
                    <h4 className='ml-2 inline-block'>Confirm</h4>
                </div>
            }
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key='back' type='default' onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key='button'
                    danger
                    loading={confirmLoading}
                    type='primary'
                    onClick={() => {
                        handleDeleteProduct();
                    }}
                >
                    Delete
                </Button>,
            ]}
        >
            <p>Are you sure want to delete this product?</p>
        </Modal>
    );
};

export default ModalDelete;
