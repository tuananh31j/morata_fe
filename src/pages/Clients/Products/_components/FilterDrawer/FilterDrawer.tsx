import { Drawer, InputNumber, Menu } from 'antd';
import { useState } from 'react';

import type { MenuProps } from 'antd';

import { FilterFilled, MinusOutlined } from '@ant-design/icons';
import CheckBoxDisplay from '../CheckBoxDisplay/CheckBoxDisplay';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '1',
        label: <p className='text-[14px] font-bold'>Brand</p>,
        children: [
            { key: '11', label: <CheckBoxDisplay boxType lable='CheckBoxDisplay' /> },
            { key: '12', label: <CheckBoxDisplay boxType lable='1 CheckBoxDisplay' /> },
            { key: '13', label: <CheckBoxDisplay boxType lable='2 CheckBoxDisplay' /> },
            { key: '14', label: <CheckBoxDisplay boxType lable='3 CheckBoxDisplay' /> },
            { key: '15', label: <CheckBoxDisplay boxType lable='4 CheckBoxDisplay' /> },
        ],
    },
    {
        key: '2',
        label: <p className='text-[14px] font-bold'>Color</p>,
        children: [
            { key: '20', label: <CheckBoxDisplay colorType lable='CheckBoxDisplay' /> },
            { key: '21', label: <CheckBoxDisplay colorType lable='CheckBoxDisplay' /> },
            { key: '22', label: <CheckBoxDisplay colorType lable='CheckBoxDisplay' /> },
            { key: '23', label: <CheckBoxDisplay colorType lable='CheckBoxDisplay' /> },
            { key: '24', label: <CheckBoxDisplay colorType lable='CheckBoxDisplay' /> },
            { key: '25', label: <CheckBoxDisplay colorType lable='CheckBoxDisplay' /> },
            { key: '26', label: <CheckBoxDisplay colorType lable='CheckBoxDisplay' /> },
            { key: '27', label: <CheckBoxDisplay colorType lable='CheckBoxDisplay' /> },
        ],
    },
    {
        key: '3',
        label: <p className='text-[14px] font-bold'>Navigation Two</p>,
        children: [
            { key: '30', label: <CheckBoxDisplay boxType lable='CheckBoxDisplay' /> },
            { key: '31', label: <CheckBoxDisplay boxType lable='CheckBoxDisplay' /> },
            { key: '32', label: <CheckBoxDisplay boxType lable='CheckBoxDisplay' /> },
            { key: '33', label: <CheckBoxDisplay boxType lable='CheckBoxDisplay' /> },
            { key: '34', label: <CheckBoxDisplay boxType lable='CheckBoxDisplay' /> },
            { key: '35', label: <CheckBoxDisplay boxType lable='CheckBoxDisplay' /> },
            { key: '36', label: <CheckBoxDisplay boxType lable='CheckBoxDisplay' /> },
            { key: '37', label: <CheckBoxDisplay boxType lable='CheckBoxDisplay' /> },
        ],
    },
];

interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};
const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const FilterDrawer = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <button onClick={showDrawer}>
                        <FilterFilled /> Filter
                    </button>
                    <Drawer className='relative' size='default' title='Filter' onClose={onClose} open={open}>
                        <div className='mb-[70%]'>
                            <Menu
                                mode='inline'
                                openKeys={stateOpenKeys}
                                onOpenChange={onOpenChange}
                                style={{ width: '100%' }}
                                items={items}
                            />
                        </div>
                        <div className='absolute bottom-1  w-full bg-white py-4'>
                            <p className='m-3 text-[14px] font-bold'>Khoảng giá</p>
                            <div className='m-3 flex w-[80%] items-center justify-between gap-2'>
                                <InputNumber className='w-[48%]' min={1} max={10} defaultValue={3} />
                                <MinusOutlined />
                                <InputNumber className='w-[48%]' min={1} max={10} defaultValue={3} />
                            </div>
                            <div className='  m-3  flex w-[80%] items-center justify-between  gap-3'>
                                <button className='border-gray-600 flex-1 rounded-md border p-3 hover:bg-slate-400 hover:text-white'>
                                    Reset
                                </button>
                                <button className='flex-1 rounded-md border border-blue-600 p-3 hover:bg-[#0068c9] hover:text-white'>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </Drawer>
                </div>
                <button>Reset</button>
            </div>
        </div>
    );
};

export default FilterDrawer;
