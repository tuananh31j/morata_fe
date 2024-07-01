import { FC } from 'react';
import ColItem from '../_modules/ColItem';
import WrapperRow from '../_modules/WrapperRow';

type IRowBrand = {
    brand: {
        rank: number;
        name: string;
        productsQuantity: number;
        revenues: number | string;
        sales: number;
    };
};
const RowBrand: FC<IRowBrand> = ({ brand }) => {
    return (
        <WrapperRow>
            <ColItem classic>Top {brand.rank}</ColItem>
            <ColItem classic>{brand.name}</ColItem>
            <ColItem classic>{brand.productsQuantity}</ColItem>
            <ColItem classic>{brand.revenues}</ColItem>
            <ColItem classic>{brand.sales}</ColItem>
        </WrapperRow>
    );
};
export default RowBrand;
