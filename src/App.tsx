import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import PrivateLayout from './layouts/PrivateLayout';
import NotFound from './pages/NotFound';
import { Suspense } from 'react';
import Loading from './components/Loading/Loading';
import { AdminRoutes, ClientRoutes } from './routes';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* client */}
                <Route path='' element={<MainLayout />}>
                    {ClientRoutes.map((router, i) => {
                        const Page = router.ELEMENT;
                        return (
                            <Route
                                key={i}
                                path={router.PATH}
                                element={
                                    <Suspense fallback={<Loading />}>
                                        <Page />
                                    </Suspense>
                                }
                            >
                                {router.indexPath && (
                                    <Route path='' element={<Navigate replace to={router.indexPath} />} />
                                )}
                                {router.CHILDREN &&
                                    router.CHILDREN.map((routerChildren, i) => {
                                        const Page = routerChildren.ELEMENT;
                                        return (
                                            <Route
                                                key={i}
                                                path={routerChildren.PATH}
                                                element={
                                                    <Suspense fallback={<Loading />}>
                                                        <Page />
                                                    </Suspense>
                                                }
                                            ></Route>
                                        );
                                    })}
                            </Route>
                        );
                    })}
                </Route>

                {/* admin */}
                <Route path='admin' element={<PrivateLayout />}>
                    {AdminRoutes.map((router, i) => {
                        const Page = router.ELEMENT;
                        return (
                            <Route
                                key={i}
                                path={router.PATH}
                                element={
                                    <Suspense fallback={<Loading />}>
                                        <Page />
                                    </Suspense>
                                }
                            ></Route>
                        );
                    })}
                </Route>
                <Route path='*' element={<Navigate to='/404' />} />
                <Route path='/404' element={<NotFound />} />
            </Routes>
        </Router>
    );
};
export default App;
