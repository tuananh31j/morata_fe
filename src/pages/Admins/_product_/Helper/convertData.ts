/* eslint-disable no-nested-ternary */
import { AttributeType, DataTypeConvert } from '~/constants/enum';
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
        return dataSource.reduce((acc: { [key: string]: any }, { key, value }: any, i) => {
            if (
                attributeSource[i] &&
                key === attributeSource[i].attributeKey &&
                attributeSource[i].type === AttributeType.Multiple
            ) {
                const values = value.includes('_+') ? value.split('_+') : value;
                acc[key] = Array.isArray(values) ? values : [values];
            } else {
                acc[key] = value.includes('_+') ? value.split('_+') : value;
            }
            return acc;
        }, {});
    }

    const attributesData = Object.entries(data)
        .map(([key, value]) => ({
            name: attributeSource.find((attr) => attr.attributeKey === key)?.name || key.replace(/_/g, ' '),
            key,
            value: value ? (Array.isArray(value) ? value.join('_+') : value) : '',
        }))
        .filter((item) => attributeSource.find((attr) => attr.attributeKey === item.key));

    return attributesData;
};

export default convertData;
