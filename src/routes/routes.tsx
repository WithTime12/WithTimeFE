import { createBrowserRouter } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider';

import Layout from '@/layout/layout';
import Home from '@/pages/F.O-2/homePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <ModalProvider />
                <Layout />
            </>
        ),
        errorElement: <div>Error</div>,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
]);

export default router;
