import type { PropsWithChildren } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

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

function ProtectedRoute({ children }: PropsWithChildren) {
    const isLoggedIn = false;

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

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
                element: <Login />,
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
                path: 'home',
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'usersetting',
                element: (
                    <ProtectedRoute>
                        <User />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'dateTest',
                element: (
                    <ProtectedRoute>
                        <DateTest />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'testResult',
                element: (
                    <ProtectedRoute>
                        <Result />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'payment',
                element: (
                    <ProtectedRoute>
                        <Pay />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'withdraw',
                element: (
                    <ProtectedRoute>
                        <Withdraw />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'course',
                element: (
                    <ProtectedRoute>
                        <Course />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

export default router;
