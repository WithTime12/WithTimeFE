import type { PropsWithChildren } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider';

import AuthLayout from '@/layout/authLayout';
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
                <AuthLayout />
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
                path: 'usersetting',
                element: (
                    <ProtectedRoute>
                        <User />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <ModalProvider />
                <Layout />
            </ProtectedRoute>
        ),
        errorElement: <div>Error</div>,
        children: [
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'question',
                element: <div />,
            },
            {
                path: 'notice',
                element: <div />,
            },
            {
                path: 'notice/:id',
                element: <div />,
            },
            {
                path: 'dateCourse',
                element: <div />,
            },
            {
                path: 'makeCourse',
                element: <Course />,
            },
            {
                path: 'makeCourse/:step',
                element: <div />,
            },
            {
                path: 'dateTest',
                element: <DateTest />,
            },
            {
                path: 'dateTest/:step',
                element: <Result />,
            },
        ],
    },
    {
        path: '/withdraw',
        element: (
            <ProtectedRoute>
                <Withdraw />
            </ProtectedRoute>
        ),
    },
    {
        path: '/payment',
        element: (
            <ProtectedRoute>
                <Pay />
            </ProtectedRoute>
        ),
    },
]);

export default router;
