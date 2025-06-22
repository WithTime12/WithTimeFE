import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout/layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <div>Error</div>,
        children: [
            {
                index: true,
                element: <div className="font-hero text-primary-500">Home</div>,
            },
        ],
    },
]);

export default router;
