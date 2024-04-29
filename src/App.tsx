import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import { AdminRoutes, ClientRoutes } from './routes';
import PrivateLayout from './layouts/PrivateLayout';
import NotFound from './pages/NotFound';
import CheckOut from './pages/Clients/Checkout/CheckOut';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* client */}
                <Route path='' element={<MainLayout />}>
                    {ClientRoutes.map((router, i) => {
                        const Page = router.ELEMENT;
                        return <Route key={i} path={router.PATH} element={<Page />}></Route>;
                    })}
                </Route>

                {/* admin */}
                <Route path='admin' element={<PrivateLayout />}>
                    {AdminRoutes.map((router, i) => {
                        const Page = router.ELEMENT;
                        return <Route key={i} path={router.PATH} element={<Page />}></Route>;
                    })}
                </Route>
                <Route path='checkout' element={<CheckOut />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
};
export default App;
