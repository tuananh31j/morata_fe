import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/_global.css';
import { QueryProvider, ReduxProvider } from './contexts';
import AutoScrollToTop from '~/components/_common/AutoScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ReduxProvider>
                <QueryProvider>
                    <AutoScrollToTop>
                        <App />
                        <ToastContainer />
                    </AutoScrollToTop>
                </QueryProvider>
            </ReduxProvider>
        </BrowserRouter>
    </React.StrictMode>
);
