import { toast } from 'react-toastify';

const showMessage = (message: string, type: 'warning' | 'error' | 'success' | 'info') => {
    toast[type](message, {
        autoClose: 1000,
    });
};

export default showMessage;
