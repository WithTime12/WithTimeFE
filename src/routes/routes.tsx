import type { PropsWithChildren } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider';

import AuthLayout from '@/layout/authLayout';
import Layout from '@/layout/layout';
import Error from '@/pages/common/Error';
import Course from '@/pages/CoursePage';
import DateTest from '@/pages/dateTest';
import FindPw from '@/pages/FindPw';
import Home from '@/pages/HomePage';
import Join from '@/pages/JoinPage';
import Login from '@/pages/LoginPage';
import MakeCourse from '@/pages/MakeCourse';
import MakeCourseStep from '@/pages/MakeCourseStep';
import Notice from '@/pages/Notice';
import NoticeDetail from '@/pages/NoticeDetail';
import Pay from '@/pages/PaymentPage';
import Question from '@/pages/Question';
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
        errorElement: <Error />,
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
        errorElement: <Error />,
        children: [
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'question',
                element: <Question />,
            },
            {
                path: 'notice',
                element: <Notice />,
            },
            {
                path: 'notice/:id',
                element: <NoticeDetail />,
            },
            {
                path: 'dateCourse',
                element: <Course />,
            },
            {
                path: 'makeCourse',
                element: <MakeCourse />,
            },
            {
                path: 'makeCourse/:step',
                element: <MakeCourseStep />,
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
        errorElement: <Error />,
    },
    {
        path: '/payment',
        element: (
            <ProtectedRoute>
                <Pay />
            </ProtectedRoute>
        ),
        errorElement: <Error />,
    },
]);

export default router;
