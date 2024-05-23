import { useState } from 'react';

const useLocalStorage = (key: string, initialValue?: string | boolean) => {
    const currentValue = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log('useLocalstorage: ', error);
            return initialValue;
        }
    };
    const [storedValue, setStoredValue] = useState(currentValue);

    const setValue = (value: string) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
