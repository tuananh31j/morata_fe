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
