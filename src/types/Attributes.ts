import { AttributeType } from '~/constants/enum';

export type IAttributesValue = {
    _id: string;
    name: string;
    isVariant: boolean;
    isRequired: boolean;
    type: AttributeType;
    values: number[] | string[];
    attributeKey: string;
};

export type IAttributeReponse = {
    categoryId: string;
    productAttributes: {
        attributeIds: IAttributesValue[];
    };
    variantAttribute: {
        attributeIds: IAttributesValue[];
    };
};

export type IAttributeResponseNew = {
    _id: string;
    name: string;
    type: string;
    values: string[];
};
