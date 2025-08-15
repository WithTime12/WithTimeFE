import { Navigate, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import { useNotice } from '@/hooks/notice/useNotice';

import MainCard from './mainCard';

import AddCircleBlank from '@/assets/icons/add-circle_Blank.svg?react';

function MainInfo() {
    const navigate = useNavigate();
    const { useGetNotices } = useNotice();

    const { data, isError, isLoading } = useGetNotices({ size: 3, page: 0, category: 'SERVICE' });

    if (isError) {
        return <Navigate to="/error" replace />;
    }

    if (isLoading) {
        return (
            <MainCard>
                <ClipLoader className="self-center" />
            </MainCard>
        );
    }

    const notices = data?.result?.noticeList ?? [];

    return (
        <MainCard>
            <div className="flex flex-col w-full sm:px-[48px] px-[20px] sm:py-[40px] py-[20px] shadow-default rounded-2xl">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-bold mb-3">공지사항</div>
                    <button
                        className="text-default-gray-800 font-semibold flex justify-center items-center gap-1 whitespace-nowrap hover:cursor-pointer"
                        onClick={() => navigate('/notice')}
                    >
                        전체보기 <AddCircleBlank className="w-4 h-4 stroke-[#000000]" />
                    </button>
                </div>

                <ul className="text-default-gray-700 space-y-1 w-full flex flex-col">
                    {notices.length === 0 ? (
                        <li className="text-default-gray-500">공지사항이 없습니다.</li>
                    ) : (
                        notices.map((notice) => (
                            <li key={notice.noticeId}>
                                <button
                                    className="whitespace-nowrap text-ellipsis overflow-hidden w-full text-left"
                                    onClick={() => navigate(`/notice/${notice.noticeId}`)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            navigate(`/notice/${notice.noticeId}`);
                                        }
                                    }}
                                    tabIndex={0}
                                >
                                    {notice.title}
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </MainCard>
    );
}

export default MainInfo;
