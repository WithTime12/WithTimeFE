import { useNavigate, useParams } from 'react-router-dom';

import { formatDateDot } from '@/utils/date';

import { useNotice } from '@/hooks/notice/useNotice';

export default function NoticeDetail() {
    const navigate = useNavigate();
    const { noticeId } = useParams<{ noticeId: string }>(); // URL에서 noticeId 추출
    const id = Number(noticeId);
    const isValidId = Number.isInteger(id) && id > 0; // Id 유효성 계산

    const { useGetNoticeDetail } = useNotice();
    const { data, isLoading, isError } = useGetNoticeDetail(id);

    // Id 유효성 검사 -> 훅 호출
    if (!isValidId) {
        return <div className="text-center font-body1 text-default-gray-500 py-50">잘못된 공지사항 ID입니다.</div>;
    }
    if (isLoading) {
        return <div className="text-center font-body1 text-default-gray-500 py-50">로딩 중</div>;
    }
    if (isError || !data?.result) {
        return <div className="text-center font-body1 text-default-gray-500 py-50">공지사항을 불러오는 데 실패했습니다.</div>;
    }
    const notice = data?.result ?? null;

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10">
            <h1 className="mb-8 font-heading2">공지사항</h1>

            {/* 제목 + 작성일 */}
            <div className="border-y border-default-gray-400 py-4 mb-8">
                <p className="font-heading3 text-default-gray-800 mb-2">{notice.title}</p>
                <p className="font-body1 text-default-gray-500">{formatDateDot(notice.createdAt)}</p>
            </div>

            {/* 내용 */}
            <div className="whitespace-pre-line leading-relaxed mb-12 font-body2">{notice.content || '내용이 없습니다.'}</div>

            {/* 목록으로 돌아가기 버튼 */}
            <div>
                <button onClick={() => navigate('/notice')} className="px-6 py-2 rounded-full font-body1 bg-primary-500 text-white">
                    목록으로 돌아가기
                </button>
            </div>
        </div>
    );
}
