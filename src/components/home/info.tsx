import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetNotices } from '@/hooks/notices/useGetNotices';

import MainCard from './mainCard';

import AddCircleBlank from '@/assets/icons/add-circle_Blank.svg?react';

function MainInfo() {
    const navigate = useNavigate();
    const { data, error } = useGetNotices({ size: 3, page: 0, noticeCategory: 'SERVICE' });
    if (error) {
        navigate('/error');
    }
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
                    {data?.pages.map((page) =>
                        page.result.noticeList.map((notice) => {
                            return (
                                <li
                                    className="whitespace-nowrap text-ellipsis overflow-hidden"
                                    key={notice.noticeId}
                                    onClick={() => navigate(`/notice/${notice.noticeId}`)}
                                >
                                    {notice.title}
                                </li>
                            );
                        }),
                    )}
                </ul>
            </div>
        </MainCard>
    );
}

export default memo(MainInfo);
