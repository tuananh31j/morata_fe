export type IAttributesValue = {
    name: string;
    value: string;
};

export type IAttributeReponse = {
    _id: string;
    attribute: string;
    categoryId: string;
    details: IAttributesValue[];
};

export type IAttributeResponseNew = {
    _id: string;
    name: string;
    type: string;
    values: string[];
};
