import { IAttributesProduct } from '~/types/Product';

const ProductAttributeShort = ({ attributes }: { attributes: IAttributesProduct }) => {
    return (
        <ul className='mb-5'>
            {attributes.map((attr, i) => {
                if (i > 2) return null;
                return (
                    <li key={i}>
                        <span className="text-gray-600 after:bg-gray-400 relative line-clamp-1 select-none text-sm capitalize after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:content-['']">
                            {attr.name}: {attr.value}
                        </span>
                    </li>
                );
            })}
            {attributes.length > 4 && <span>.....</span>}
        </ul>
    );
};

export default ProductAttributeShort;
