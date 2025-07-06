import type { PropsWithChildren } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider';

import Layout from '@/layout/layout';
import Course from '@/pages/CoursePage';
import DateTest from '@/pages/dateTest';
import FindPw from '@/pages/FindPw';
import Home from '@/pages/HomePage';
import Join from '@/pages/JoinPage';
import Login from '@/pages/LoginPage';
import Pay from '@/pages/PaymentPage';
import Result from '@/pages/ResultPage';
import User from '@/pages/UserSetting';
import Withdraw from '@/pages/WithdrawPage';

function ProtectedRoute({ children }: PropsWithChildren) {
    //추후 실제 로그인 여부로 대체 필요
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
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
