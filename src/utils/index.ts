import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const generateParamsString = (key: string, sortValue: 1 | -1) => `${key}=${sortValue}`;
export const generateStringToObject = (value: string): Record<string, number> => {
    const arr = value.split('_');
    const obj = Object.fromEntries(arr.map((item) => item.split(' '))) as Record<string, number>;
    return obj;
};
