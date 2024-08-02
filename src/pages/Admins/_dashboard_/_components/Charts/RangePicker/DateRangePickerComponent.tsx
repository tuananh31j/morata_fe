import React, { useState } from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import type { RangeValue } from '~/types/DateRange';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface DateRangePickerProps {
    onDateRangeChange: (dates: [Dayjs, Dayjs] | null) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({ onDateRangeChange }) => {
    const dateFormat = 'DD/MM/YYYY';
    const [dateRange, setDateRange] = useState<RangeValue<Dayjs>>(null);
    const defaultValue = [dayjs('25/07/2024', dateFormat), dayjs('26/07/2024', dateFormat)];

    const handleDateRangeChange = (dates: RangeValue<Dayjs>) => {
        setDateRange(dates);
        if (dates && dates[0] && dates[1]) {
            onDateRangeChange([dates[0], dates[1]]);
        } else {
            onDateRangeChange(null);
        }
    };

    return (
        <RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            format={dateFormat}
            defaultValue={[dayjs('28/07/2024', dateFormat), dayjs('28/07/2024', dateFormat)]}
        />
    );
};

export default DateRangePickerComponent;
