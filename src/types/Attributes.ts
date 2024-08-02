export type IAttributesValue = {
    name: string;
    type: string;
    attributeKey: string;
    values: string[];
    isRequired: boolean;
};

export type IAttributeReponse = {
    categoryId: string;
    productAttributes: {
        attributeIds: IAttributesValue[];
    };
};

export type IAttributeResponseNew = {
    _id: string;
    name: string;
    type: string;
    values: string[];
};
