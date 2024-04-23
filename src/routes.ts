import About from './pages/Clients/About';
import Dashboard from './pages/Admins/Dashboard';
import Home from './pages/Clients/Home';

export const ClientRoutes = [
    { PATH: '', ELEMENT: Home },
    { PATH: 'about', ELEMENT: About },
];

export const AdminRoutes = [{ PATH: '', ELEMENT: Dashboard }];
