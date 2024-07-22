import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker, DatePickerProps, Dropdown, MenuProps, Space } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import DropDownItem from './_modules/DropDownItem';

type ITimePlayload = { start: string; end: string };

enum Picker {
    Date = 'date',
    Month = 'month',
    Year = 'year',
}

const DATE_FIELD = 'date-field';

const today = dayjs(new Date()).format('YYYY-MM-DD');
const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
const dateSevenDayAgo = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
const dateThirtyDayAgo = dayjs().subtract(30, 'day').format('YYYY-MM-DD');

const thirtydayAgo: ITimePlayload = { start: dateThirtyDayAgo, end: today };
const sevenDayAgo: ITimePlayload = {
    start: dateSevenDayAgo,
    end: today,
};
const disabledDate = (current: dayjs.Dayjs) => {
    return current && current > dayjs().endOf('day');
};

// @component
const DatePickerCard = () => {
    const [datePickerType, setDatePickerType] = useState<Picker>(Picker.Date);
    const [picked, setPicked] = useState<string | ITimePlayload>(today);
    const [openDrowdown, setOpenDropdown] = useState<boolean>(false);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const handlePickerDate = (date: string | ITimePlayload) => {
        setOpenCalendar(false);
        setOpenDropdown(false);
        setPicked(date);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        handlePickerDate(dateString as string);
    };

    const handlePickerType = (type: Picker) => {
        setDatePickerType(type);
        setOpenCalendar(true);
    };
    console.log(openDrowdown, 'openDrowdown');
    const items: MenuProps['items'] = [
        {
            label: (
                <Space direction='vertical' className='border-r p-4 '>
                    <div>
                        <DropDownItem title='Today' handleClick={() => handlePickerDate(today)} />
                        <DropDownItem title='yesterday' handleClick={() => handlePickerDate(yesterday)} />
                        <DropDownItem title='Past 7 Days' handleClick={() => handlePickerDate(sevenDayAgo)} />
                        <DropDownItem title='Past 30 Days' handleClick={() => handlePickerDate(thirtydayAgo)} />
                    </div>
                    <hr />
                    <div>
                        <DropDownItem
                            lableId={DATE_FIELD}
                            title='By Day'
                            handleClick={() => handlePickerType(Picker.Date)}
                        />
                        <DropDownItem
                            lableId={DATE_FIELD}
                            title='By Month'
                            handleClick={() => handlePickerType(Picker.Month)}
                        />
                        <DropDownItem
                            lableId={DATE_FIELD}
                            title='By Year'
                            handleClick={() => handlePickerType(Picker.Year)}
                        />
                    </div>
                </Space>
            ),
            onClick: (e) => {
                e.domEvent.stopPropagation();
            },
            key: '0',
        },
    ];

    return (
        <Dropdown open={openDrowdown} menu={{ items }} trigger={['click']}>
            <div className='inline-block'>
                <span className='flex items-center gap-3 rounded-md border border-transparent bg-white p-3  py-1 font-satoshi text-sm text-black hover:border-blue-500 hover:text-blue-500 dark:bg-black dark:text-white'>
                    <span
                        onClick={() => {
                            setOpenDropdown(!openDrowdown);
                        }}
                        className='cursor-pointer border-e pe-2 capitalize text-body hover:underline'
                    >
                        Data Period
                    </span>
                    <span className='cursor-default text-body'>From:</span>
                    <span className='cursor-default text-body'>
                        {typeof picked === 'object' && `${picked.start} - ${picked.end}`}
                        {picked === today && 'Today'}
                        {picked !== today && typeof picked !== 'object' && picked}
                    </span>
                    <span>
                        <DatePicker
                            open={openCalendar}
                            itemScope
                            disabledDate={disabledDate}
                            picker={datePickerType}
                            inputReadOnly
                            allowClear={false}
                            className='cursor-default border border-transparent focus:border-transparent'
                            components={{
                                input: (inputProps) => (
                                    <input className='fixed cursor-default opacity-0' {...inputProps} id={DATE_FIELD} />
                                ),
                            }}
                            removeIcon={<CalendarOutlined />}
                            placement='bottomLeft'
                            onChange={onChange}
                            popupClassName='absolute pt-3'
                        />
                    </span>
                </span>
            </div>
        </Dropdown>
    );
};

export default DatePickerCard;
