/* eslint-disable no-nested-ternary */
import { DataTypeConvert } from '~/constants/enum';
import { IAttribute } from '../../../../types/Product';
import _ from 'lodash';
import { IAttributesValue } from '~/types/Attributes';

interface IConverDataProps {
    data:
        | {
              name: string;
              key: string;
              value: string;
          }[]
        | IAttribute[]
        | { [key: string]: any };
    to: DataTypeConvert;
    attributeSource: IAttributesValue[];
}
const convertData = ({ data, to, attributeSource }: IConverDataProps) => {
    if (to === DataTypeConvert.obj && Array.isArray(data)) {
        const dataSource = data.map((item) => _.mapValues(item, (value) => (_.isUndefined(value) ? '' : value)));
        return dataSource.reduce((acc: { [key: string]: any }, { key, value }: any) => {
            if (key === 'value') {
                acc[key] = value.includes(',') ? value.split(', ') : value;
            } else {
                acc[key] = value;
            }
            return acc;
        }, {});
    }

    const attributesData = Object.entries(data).map(([key, value]) => ({
        name: attributeSource.find((attr) => attr.attributeKey === key)?.name || key.replace(/_/g, ' '),
        key,
        value: value ? (Array.isArray(value) ? value.join(',') : value) : '',
    }));
    console.log(attributesData, 'attributesData');
    // console.log(object.entries(data), 'object.entries(data)');
    return attributesData;
};

export default convertData;
