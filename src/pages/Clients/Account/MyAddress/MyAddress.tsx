import { Button, List, Modal, Form, Input, Select, Switch } from 'antd';
import WrapperList from '~/components/WrapperList';
import { PlusOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import { useState } from 'react';

const MyAddress = () => {
  const addresses = [
    { id: 1, address: '4 Dinh Hoa Hamlet, Thu Dau Mot Town', phone: '0865222555' },
    { id: 2, address: '456 Maple Ave, City, State, Country' },
    // ...
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleAddAddress = () => {
    setCurrentAddress(null);
    setIsModalVisible(true);
  };

  const handleEditAddress = (address) => {
    setCurrentAddress(address);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle form submission here
    setIsModalVisible(false);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <WrapperList title='My address' className='my-0'>
        {/* @Content */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#32373d]">Sổ địa chỉ nhận hàng </h2>
          <Button
            type="primary"
            onClick={handleAddAddress}
            className="text-white bg-green-500 hover:bg-green-700 transition duration-200 flex items-center"
          >
            <PlusOutlined className="mr-1" />
            <p>Thêm địa chỉ mới</p>
          </Button>
        </div>
        <List
          className='w-[72vw] rounded-lg bg-white shadow-md p-4'
          itemLayout="horizontal"
          dataSource={addresses}
          renderItem={item => (
            <List.Item className="border-b border-gray-200 py-2 ">
              <List.Item.Meta
                className=''
                avatar={<div className="bg-blue-100 rounded-full p-2">
                  <HomeOutlined className="text-red-500 text-2xl" />
                </div>}
                title={
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-lg">{item.address}</label>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditAddress(item.id)}
                        className="text-white bg-red-500 hover:bg-blue-700 transition duration-200"
                      >
                        Sửa
                      </Button>
                    </div>
                    <label className="text-gray-500">{item.phone}</label> {/* Make phone number gray */}
                    <div>
                      <label className="text-sm text-gray-500">Mặc định</label> {/* Make "Mặc định" smaller and gray */}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <Modal title="Thêm địa chỉ mới " open={isModalVisible} footer={null} onCancel={handleCancel}>
          <Form layout='vertical' onFinish={handleOk} >
            <Form.Item name="name" label="Full Name">
              <Input placeholder="Enter full name" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item name="province" label="Province">
              <Select placeholder="Select a province">
                {/* Add your options here */}
              </Select>
            </Form.Item>
            <Form.Item name="district" label="District">
              <Select placeholder="Select a district">
                {/* Add your options here */}
              </Select>
            </Form.Item>
            <Form.Item name="ward" label="Ward">
              <Select placeholder="Select a ward">
                {/* Add your options here */}
              </Select>
            </Form.Item>
            <Form.Item name="address" label="Specific Address">
              <Input placeholder="Enter specific address" />
            </Form.Item>
            <div className='flex justify-between items-center mb-4'>
              <label className='mr-2'>Đặt làm địa chỉ mặc định</label>
              <Form.Item
                name="default"
                valuePropName="checked"
                noStyle
              >
                <Switch checkedChildren="" unCheckedChildren="" />
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </WrapperList>
    </>

  );
};

export default MyAddress;
