import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/_global.css';
import { QueryProvider, ReduxProvider } from './contexts';
import AutoScrollToTop from '~/components/_common/AutoScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import vi from 'antd/locale/vi_VN';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ReduxProvider>
                <QueryProvider>
                    <AutoScrollToTop>
                        <ConfigProvider locale={vi}>
                            <App />
                        </ConfigProvider>
                        <ToastContainer position='bottom-right' />
                    </AutoScrollToTop>
                </QueryProvider>
            </ReduxProvider>
        </BrowserRouter>
    </React.StrictMode>
);
