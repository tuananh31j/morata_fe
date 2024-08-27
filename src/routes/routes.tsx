import PrivateRoutes from '~/routes/PrivateRoutes';
import PublicRoutes from '~/routes/PublicRoutes';

const RootRoutes = [...PublicRoutes, ...PrivateRoutes];

export default RootRoutes;
