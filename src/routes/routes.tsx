import { createBrowserRouter } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider';

import Layout from '@/layout/layout';
import FindPw from '@/pages/F.O-1/FindPw';
import Join from '@/pages/F.O-1/JoinPage';
import Login from '@/pages/F.O-1/LoginPage';
import User from '@/pages/F.O-1/userSetting';
import DateTest from '@/pages/F.O-2/dateTest';
import Home from '@/pages/F.O-2/homePage';
import Result from '@/pages/F.O-2/ResultPage';
import Pay from '@/pages/F.O-3/paymentPage';
import Withdraw from '@/pages/F.O-3/withdrawPage';
import Course from '@/pages/F.O-4/coursePage';

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
            {
                path: 'find-pw',
                element: <FindPw />,
            },
            {
                path: 'join',
                element: <Join />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'usersetting',
                element: <User />,
            },
            {
                path: 'dateTest',
                element: <DateTest />,
            },
            {
                path: 'testResult',
                element: <Result />,
            },
            {
                path: 'payment',
                element: <Pay />,
            },
            {
                path: 'withdraw',
                element: <Withdraw />,
            },
            {
                path: 'course',
                element: <Course />,
            },
        ],
    },
]);

export default router;
