import { useNavigate, useParams } from 'react-router-dom';

import { useNotice } from '@/hooks/notice/useNotice';

export default function NoticeDetail() {
    const navigate = useNavigate();
    const { noticeId } = useParams<{ noticeId: string }>(); // URL에서 noticeId 추출
    const id = Number(noticeId);

    const { useGetNoticeDetail } = useNotice();
    const { data, isLoading, isError } = useGetNoticeDetail(id);

    const notice = data?.result ?? null;

    if (!Number.isFinite(id)) {
        return <div className="text-center font-body2 text-default-gray-800 mt-10">잘못된 공지사항 ID입니다.</div>;
    }
    if (isLoading) return <div className="text-center font-body2 text-default-gray-800 mt-10">로딩 중</div>;
    if (isError || !notice) {
        return <div className="text-center font-body2 text-default-gray-800 mt-10">공지사항을 불러오는 데 실패했습니다.</div>;
    }

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10">
            <h1 className="mb-8 font-heading2">공지사항</h1>

            {/* 제목 + 작성일 */}
            <div className="border-y border-default-gray-400 py-4 mb-8">
                <p className="font-heading3 mb-1">{notice.title}</p>
                <p className="font-body1 text-default-gray-500">{new Date(notice.createdAt).toLocaleDateString()}</p>
            </div>

            {/* 내용 */}
            <div className="whitespace-pre-line leading-relaxed mb-12 font-body2">{notice.content || '내용이 없습니다.'}</div>

            {/* 목록으로 돌아가기 버튼 */}
            <div>
                <button onClick={() => navigate('/notice')} className="px-6 py-2 rounded-full bg-primary-500 text-white">
                    목록으로 돌아가기
                </button>
            </div>
        </div>
    );
}
