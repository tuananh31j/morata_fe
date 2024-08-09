import React, { forwardRef, useEffect, useState } from 'react';
import { DatePicker, DatePickerProps, Dropdown, MenuProps, Space, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';
import DropDownItem from './_modules/DropDownItem';

type DateInput =
    | { type: 'single'; date: string }
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

type DatePickerCardProps = {
    onDateChange: (date: DateInput) => void;
    initialDate: DateInput;
};

enum Picker {
    Date = 'date',
    Month = 'month',
    Year = 'year',
}

const DATE_FIELD = 'date-field';
const MONTH_FIELD = 'month-field';
const YEAR_FIELD = 'year-field';

const DAY_FIELD = 'date-field';
const WEEK_FIELD = 'month-field';
const DAY30_FIELD = 'year-field';

const today = moment().format('YYYY-MM-DD');
const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
const dateSevenDayAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
const dateThirtyDayAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');

const DatePickerCard: React.FC<DatePickerCardProps> = ({ onDateChange, initialDate }) => {
    const [datePickerType, setDatePickerType] = useState<Picker>(Picker.Date);
    const [picked, setPicked] = useState<DateInput>(initialDate);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    useEffect(() => {
        setPicked(initialDate);
    }, [initialDate]);

    const handlePickerDate = (date: Dayjs | null) => {
        if (date) {
            setOpenCalendar(false);
            setOpenDropdown(false);

            let pickedValue: DateInput;

            switch (datePickerType) {
                case Picker.Year:
                    pickedValue = { type: 'yearly', year: date.year() };
                    break;
                case Picker.Month:
                    pickedValue = { type: 'monthly', year: date.year(), month: date.month() + 1 };
                    break;
                default:
                    pickedValue = { type: 'single', date: date.format('YYYY-MM-DD') };
            }

            setPicked(pickedValue);
            onDateChange(pickedValue);
        }
    };

    const onChange: DatePickerProps['onChange'] = (date) => {
        handlePickerDate(date);
    };

    const handlePickerType = (type: Picker) => {
        setDatePickerType(type);
        setOpenCalendar(true);
    };

    const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
        <input ref={ref} className='fixed cursor-default opacity-0' {...props} id={DATE_FIELD} />
    ));

    CustomInput.displayName = 'CustomInput';

    const renderDateRange = (date: DateInput): string => {
        switch (date.type) {
            case 'single':
                return date.date === today ? 'Today' : date.date;
            case 'range':
                return `${date.start} - ${date.end}`;
            case 'monthly':
                return `${date.year}-${String(date.month).padStart(2, '0')}`;
            case 'yearly':
                return date.year.toString();
            default:
                return 'Invalid date'; // Add a default case to satisfy the linter
        }
    };

    const getDatePickerValue = (): Dayjs | null => {
        switch (picked.type) {
            case 'single':
                return dayjs(picked.date);
            case 'range':
                return dayjs(picked.start);
            case 'monthly':
                return dayjs(`${picked.year}-${picked.month}`, 'YYYY-M');
            case 'yearly':
                return dayjs(picked.year.toString(), 'YYYY');
            default:
                console.error('Invalid date input type');
                return null; // Return null for invalid types
        }
    };
    const items: MenuProps['items'] = [
        {
            label: (
                <Space direction='vertical' className='border-r p-4'>
                    <div>
                        <DropDownItem
                            lableId={DAY_FIELD}
                            title='Today'
                            handleClick={() => {
                                const todayDate: DateInput = { type: 'single', date: today };
                                setPicked(todayDate);
                                onDateChange(todayDate);
                            }}
                            onMouseEnter={() => setHoveredDate(today)}
                            onMouseLeave={() => setHoveredDate(null)}
                        />
                        <DropDownItem
                            lableId={WEEK_FIELD}
                            title='Yesterday'
                            handleClick={() => {
                                const yesterdayDate: DateInput = { type: 'single', date: yesterday };
                                setPicked(yesterdayDate);
                                onDateChange(yesterdayDate);
                            }}
                            onMouseEnter={() => setHoveredDate(yesterday)}
                            onMouseLeave={() => setHoveredDate(null)}
                        />
                        <DropDownItem
                            lableId={DAY30_FIELD}
                            title='Past 7 Days'
                            handleClick={() => {
                                const sevenDaysRange: DateInput = { type: 'range', start: dateSevenDayAgo, end: today };
                                setPicked(sevenDaysRange);
                                onDateChange(sevenDaysRange);
                            }}
                            onMouseEnter={() => setHoveredDate(`${dateSevenDayAgo} - ${today}`)}
                            onMouseLeave={() => setHoveredDate(null)}
                        />
                        <DropDownItem
                            title='Past 30 Days'
                            handleClick={() => {
                                const thirtyDaysRange: DateInput = {
                                    type: 'range',
                                    start: dateThirtyDayAgo,
                                    end: today,
                                };
                                setPicked(thirtyDaysRange);
                                onDateChange(thirtyDaysRange);
                            }}
                            onMouseEnter={() => setHoveredDate(`${dateThirtyDayAgo} - ${today}`)}
                            onMouseLeave={() => setHoveredDate(null)}
                        />
                    </div>
                    <hr />
                    <div>
                        <DropDownItem
                            lableId={DATE_FIELD}
                            title='By Day'
                            handleClick={() => handlePickerType(Picker.Date)}
                        />
                        <DropDownItem
                            lableId={MONTH_FIELD}
                            title='By Month'
                            handleClick={() => handlePickerType(Picker.Month)}
                        />
                        <DropDownItem
                            lableId={YEAR_FIELD}
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
        <Dropdown open={openDropdown} menu={{ items }} trigger={['click']}>
            <div className='inline-block'>
                <span className='flex items-center gap-3 rounded-md border border-transparent bg-white p-3 py-1 font-satoshi text-sm text-black hover:border-blue-500 hover:text-blue-500 dark:bg-black dark:text-white'>
                    <span
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className='cursor-pointer border-e pe-2 capitalize text-body hover:underline'
                    >
                        Data Period
                    </span>
                    <span className='cursor-default text-body'>From:</span>
                    <Tooltip title={hoveredDate || renderDateRange(picked)}>
                        <span className='w-40 cursor-default truncate text-body'>
                            {hoveredDate || renderDateRange(picked)}
                        </span>
                    </Tooltip>
                    <span>
                        <DatePicker
                            open={openCalendar}
                            disabledDate={(current) => current && current > dayjs().endOf('day')}
                            picker={datePickerType}
                            inputReadOnly
                            allowClear={false}
                            className='cursor-default border border-transparent focus:border-transparent'
                            components={{
                                input: CustomInput,
                            }}
                            suffixIcon={<CalendarOutlined />}
                            placement='bottomLeft'
                            onChange={onChange}
                            popupClassName='absolute pt-3'
                            value={getDatePickerValue()}
                        />
                    </span>
                </span>
            </div>
        </Dropdown>
    );
};

export default DatePickerCard;
