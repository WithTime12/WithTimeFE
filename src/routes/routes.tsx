import { createBrowserRouter } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider';

import AuthLayout from '@/layout/authLayout';
import Layout from '@/layout/layout';
import MinimalLayout from '@/layout/minimalLayout';
import FindPw from '@/pages/auth/FindPw';
import Join from '@/pages/auth/JoinPage';
import Login from '@/pages/auth/LoginPage';
import LoginRedirect from '@/pages/auth/RedirectPage';
import User from '@/pages/auth/UserSetting';
import Withdraw from '@/pages/auth/WithdrawPage';
import Error from '@/pages/common/Error';
import BookmarkedDateCourse from '@/pages/dateCourse/BookmarkedDateCourse';
import Course from '@/pages/dateCourse/CoursePage';
import FindDateCourse from '@/pages/dateCourse/FindDateCourse';
import MakeCourse from '@/pages/dateCourse/MakeCourse';
import MakeCourseResult from '@/pages/dateCourse/MakeCourseResult';
import MakeCourseStep from '@/pages/dateCourse/MakeCourseStep';
import DateTest from '@/pages/dateTest/dateTest';
import DateTestResult from '@/pages/dateTest/DatetestResult';
import DateTestStep from '@/pages/dateTest/DateTestStep';
import Home from '@/pages/home/HomePage';
import Notice from '@/pages/notice/Notice';
import NoticeDetail from '@/pages/notice/NoticeDetail';
import Question from '@/pages/question/Question';
import DeleteConfirmPage from '@/pages/setting/DeleteConfirmPage';
import DeleteReasonPage from '@/pages/setting/DeleteReasonPage.tsx';
import PaymentHistory from '@/pages/setting/PaymentHistory';

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
                element: <User />,
            },
            {
                path: '/api/v1/oauth2/callback/:platform',
                element: <LoginRedirect />,
            },
        ],
    },
    {
        path: '/',
        element: (
            <>
                <ModalProvider />
                <Layout />
            </>
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
                path: 'notice/:noticeId',
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
                path: 'findCourse',
                element: <FindDateCourse />,
            },
            {
                path: 'makeCourse/:step',
                element: <MakeCourseStep />,
            },
            {
                path: 'makeCourse/result',
                element: <MakeCourseResult />,
            },
            {
                path: 'bookmarkedCourse',
                element: <BookmarkedDateCourse />,
            },
            {
                path: 'dateTest',
                element: <DateTest />,
            },
            {
                path: 'dateTest/:step',
                element: <DateTestStep />,
            },
            {
                path: 'dateTest/result',
                element: <DateTestResult />,
            },
        ],
    },
    {
        path: '/',
        element: <MinimalLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/paymentHistory',
                element: <PaymentHistory />,
            },
            {
                path: '/deleteAccount',
                element: <DeleteReasonPage />,
            },
            {
                path: '/deleteAccount/confirm',
                element: <DeleteConfirmPage />,
            },
            {
                path: '/withdraw',
                element: <Withdraw />,
            },
        ],
    },
]);

export default router;
