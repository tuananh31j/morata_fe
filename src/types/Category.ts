export interface ICategoryPopular {
    totalProducts?: number;
    categoryId: string;
    categoryName: string;
    image: string;
}
export type ICategory = {
    _id: string;
    name: string;
    attributeIds: string[];
};

export type ICategoryFormData = {
    name: string;
    attributeIds: string[];
};

export enum AttributeType {
    options = 'options',
    manual = 'manual',
}

export type IAttributeFormData = {
    name: string;
    type: AttributeType;
    values: string[];
    isVariant: boolean;
    isRequired: boolean;
    // inputValues?: string[];
};
