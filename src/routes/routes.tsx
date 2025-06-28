import { createBrowserRouter } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider';

import Layout from '@/layout/layout';
import Home from '@/pages/home';

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
