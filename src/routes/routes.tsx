import type { PropsWithChildren } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider';

import Layout from '@/layout/layout';
import Course from '@/pages/coursePage';
import DateTest from '@/pages/dateTest';
import FindPw from '@/pages/FindPw';
import Home from '@/pages/HomePage';
import Join from '@/pages/JoinPage';
import Login from '@/pages/LoginPage';
import Pay from '@/pages/paymentPage';
import Result from '@/pages/ResultPage';
import User from '@/pages/userSetting';
import Withdraw from '@/pages/withdrawPage';

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
