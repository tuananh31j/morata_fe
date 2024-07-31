import { Dayjs } from 'dayjs';

export type RangeValue<T> = [T | null, T | null] | null;

// Sử dụng với Dayjs
export type DateRange = RangeValue<Dayjs>;
