import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import _ from 'lodash';

interface Rating {
    min: number;
    max: number;
    // Khai báo index signature cho phép truy cập thuộc tính bằng chuỗi
    [key: string]: number;
}

export function convertRating(query: string): Rating {
    // Sử dụng lodash để tách chuỗi query
    const parts = _.split(query, '&');

    // Khởi tạo một đối tượng rỗng để lưu trữ rating
    const rating: Rating = { min: 0, max: 0 };

    // Duyệt qua từng phần của chuỗi query
    _.forEach(parts, (part) => {
        // Tách tên và giá trị của mỗi phần
        const [key, value] = _.split(part, '=');

        // Loại bỏ dấu ngoặc vuông và lấy giá trị
        const name: string = _.trim(key, '[]');
        const val = _.parseInt(_.trim(value));

        // Gán giá trị vào đối tượng rating
        rating[name] = val;
    });

    // Trả về đối tượng rating đã được chuyển đổi
    return rating;
}
export const convertValuesToString = (inputObj: object) => {
    return _.mapValues(inputObj, (value) => {
        const stringValue = _.toString(value);
        return stringValue;
    });
};

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
