import { IAttributesProduct } from '~/types/Product';

const AddInformationContent = ({ attributes }: { attributes: IAttributesProduct }) => {
    return (
        <>
            <div className='product-desc-content min-h-[250px]'>
                {attributes && (
                    <table className=' w-[80%] '>
                        <tbody>
                            {attributes.map((item, index) => (
                                <tr key={index} className='odd:bg-gray-100   even:bg-white'>
                                    <td className='label pl-5  text-base font-semibold'>
                                        <h3 className='py-2'>{item.key.toUpperCase()}</h3>
                                    </td>
                                    <td className='value text-sm'>
                                        <p className='text-[#777777]'>{item.value}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!attributes.length && (
                    <div className='flex min-h-[250px] items-center justify-center'>
                        <h3>Sản phẩm này hiện chưa có thông tin chi tiết!</h3>
                    </div>
                )}
            </div>
        </>
    );
};

export default AddInformationContent;
