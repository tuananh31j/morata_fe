import { toast } from 'react-toastify';

const showMessage = (message: string, type: 'warning' | 'error' | 'success' | 'info') => {
    toast[type](message, {
        autoClose: 1000,
        hideProgressBar: true,
        position: 'bottom-center',
        className: 'bg-gray-800 text-white',
    });
};

export default showMessage;
