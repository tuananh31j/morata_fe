// import { Dropdown, MenuProps, message, Space } from 'antd';
// import { CaretIcon } from '~/components/Icons';

// const TopBar = () => {
//     const onClick: MenuProps['onClick'] = ({ key }) => {
//         message.info(`Click on item ${key}`);
//     };
//     const items: MenuProps['items'] = [
//         {
//             label: '1st menu item',
//             key: '1',
//         },
//         {
//             label: '2nd menu item',
//             key: '2',
//         },
//         {
//             label: '3rd menu item',
//             key: '3',
//         },
//     ];
//     return (
//         <div className='hidden justify-between border-b border-[#3b50a3] py-3 lg:flex'>
//             <div className='justify-between gap-5 lg:flex'>
//                 <div className='lg: inline-block text-left'>
//                     <div>
//                         <Dropdown menu={{ items, onClick }}>
//                             <a onClick={(e) => e.preventDefault()}>
//                                 <Space style={{ color: 'white' }}>
//                                     <img
//                                         alt='EN'
//                                         className='mr-2 inline-block h-4 w-4'
//                                         src='//demo-morata.myshopify.com/cdn/shop/t/3/assets/flag_en.png?v=14076981825125011091700037390'
//                                     />
//                                     English
//                                     <div className='border-r border-[#3b50a3] pr-5'>
//                                         <CaretIcon />
//                                     </div>
//                                 </Space>
//                             </a>
//                         </Dropdown>
//                     </div>
//                 </div>
//                 <div className='lg: inline-block text-left'>
//                     <div>
//                         <Dropdown menu={{ items, onClick }}>
//                             <a onClick={(e) => e.preventDefault()}>
//                                 <Space style={{ color: 'white' }}>
//                                     United States(USD $)
//                                     <div className='border-r border-[#3b50a3] pr-5'>
//                                         <CaretIcon />
//                                     </div>
//                                 </Space>
//                             </a>
//                         </Dropdown>
//                     </div>
//                 </div>
//                 <div className='lg: inline-block text-left'>
//                     <h3 className='inline-flex w-full justify-center  bg-blue-900 text-sm  font-medium text-white shadow-sm '>
//                         Need Help? +001 123 456 789
//                     </h3>
//                 </div>
//             </div>
//             <div className='justify-between gap-5 lg:flex'>
//                 <div className='lg: inline-block text-left'>
//                     <h3 className='inline-flex w-full justify-center   border-r border-[#3b50a3]  bg-blue-900 pr-5 text-sm font-medium text-white shadow-sm'>
//                         About Us
//                     </h3>
//                 </div>
//                 <div className='lg: inline-block text-left'>
//                     <h3 className='inline-flex w-full justify-center   border-r border-[#3b50a3]  bg-blue-900 pr-5 text-sm font-medium text-white shadow-sm'>
//                         Order Tracking
//                     </h3>
//                 </div>
//                 <div className='lg: inline-block text-left'>
//                     <h3 className='inline-flex w-full justify-center   border-r border-[#3b50a3]  bg-blue-900 pr-5 text-sm font-medium text-white shadow-sm'>
//                         Contact Us
//                     </h3>
//                 </div>
//                 <div className='lg: inline-block text-left'>
//                     <h3 className='inline-flex w-full justify-center   bg-blue-900 text-sm  font-medium text-white shadow-sm '>
//                         FAQs
//                     </h3>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TopBar;
