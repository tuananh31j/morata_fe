import { useRoutes } from 'react-router-dom';
import RootRoutes from '~/routes/routes';

const App = () => {
    const router = useRoutes(RootRoutes);
    return router;
};
export default App;
