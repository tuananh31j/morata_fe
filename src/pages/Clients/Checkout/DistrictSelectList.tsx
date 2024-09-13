import { useQueryClient } from '@tanstack/react-query';
import { Form, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { useGetDistrict } from '~/hooks/shipping/useGetDistrict';
import { setShippingAddress } from '~/store/slice/orderSlice';

const DistrictSelectList = ({ provinceId }: { provinceId: number }) => {
    const form = Form.useFormInstance();
    const { data: districtList } = useGetDistrict(provinceId);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GET_DISTRICT, provinceId],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinceId]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSelectChange = (value: string, option: any) => {
        dispatch(setShippingAddress({ districtId: +value, district: option.label }));
        dispatch(setShippingAddress({ ward: '', wardCode: '' }));
        form.setFieldsValue({
            wardCode: '',
            ward: '',
        });
    };

    return (
        <>
            <Form.Item name='districtId' rules={[{ required: true, message: <></> }]}>
                <Select options={districtList} allowClear onChange={handleSelectChange} />
            </Form.Item>
        </>
    );
};

export default DistrictSelectList;
