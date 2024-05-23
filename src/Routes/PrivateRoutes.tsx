import PrivateLayout from '~/layouts/PrivateLayout';

const PrivateRoutes = [
    {
        path: '/admin',
        element: <PrivateLayout />,
        children: [
            {
                path: 'ok',
                element: <div>Test</div>,
            },
        ],
    },
];

export default PrivateRoutes;
