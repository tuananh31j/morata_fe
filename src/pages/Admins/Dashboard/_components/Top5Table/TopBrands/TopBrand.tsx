import RowBrand from './RowBrand';
import TableDisplay from '../_modules/Table';

export type IBrandTop5 = {
    rank: number;
    name: string;
    productsQuantity: number;
    revenues: number | string;
    sales: number;
};

const brandData: IBrandTop5[] = [
    {
        rank: 1,
        name: 'Apple',
        productsQuantity: 3.5,
        revenues: '5,768',
        sales: 590,
    },
    {
        rank: 2,
        name: 'Samsung',
        productsQuantity: 2.2,
        revenues: '4,635',
        sales: 467,
    },
    {
        rank: 3,
        name: 'MSI',
        productsQuantity: 2.1,
        revenues: '4,290',
        sales: 420,
    },
    {
        rank: 4,
        name: 'Lenovo',
        productsQuantity: 1.5,
        revenues: '3,580',
        sales: 389,
    },
    {
        rank: 5,
        name: 'HP',
        productsQuantity: 3.5,
        revenues: '6,768',
        sales: 390,
    },
];
const headListBrand = ['rank', 'name', 'products', 'revenues', 'sales'];

const TopBrand = ({ title }: { title: string }) => {
    return (
        <TableDisplay title={title} headsList={headListBrand}>
            {brandData.map((brand, key) => (
                <RowBrand brand={brand} key={key} />
            ))}
        </TableDisplay>
    );
};

export default TopBrand;
