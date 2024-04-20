import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

export const ClientRoutes = [
    { PATH: '', ELEMENT: Home },
    { PATH: 'about', ELEMENT: About },
];

export const AdminRoutes = [{ PATH: '', ELEMENT: Dashboard }];
