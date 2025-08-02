import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TNoticeDetail } from '@/types/notice/notice';

import { fetchNoticeDetail } from '@/api/notice/notice';

export default function NoticeDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const noticeId = location.state?.noticeId;

    const [notice, setNotice] = useState<TNoticeDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!noticeId) {
            setError('공지사항 ID가 없습니다.');
            return;
        }

        const loadNotice = async () => {
            setLoading(true);
            try {
                const res = await fetchNoticeDetail(noticeId);

                if (!res.isSuccess || !res.result) {
                    throw new Error(res.message);
                }

                setNotice(res.result);
            } catch (err) {
                console.error('📛 공지사항 상세 조회 오류:', err);
                setError('공지사항을 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        loadNotice();
    }, [noticeId]);

    if (loading) return <div className="text-center mt-10">로딩 중...</div>;
    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10">
            {/* 타이틀 */}
            <h1 className="mb-8 font-heading2">공지사항</h1>

            {/* 공지 제목 + 날짜 */}
            <div className="border-y border-default-gray-400 py-4 mb-8">
                <p className="font-heading3 mb-1">{notice?.title}</p>
                <p className="font-body1 text-default-gray-500">{new Date(notice?.createdAt || '').toLocaleDateString()}</p>
            </div>

            {/* 본문 */}
            <div className="whitespace-pre-line leading-relaxed mb-12 font-body2">{notice?.content || '내용이 없습니다.'}</div>

            {/* 목록으로 돌아가기 */}
            <div>
                <button onClick={() => navigate('/notice')} className="px-6 py-2 rounded-full bg-primary-500 text-white">
                    목록으로 돌아가기
                </button>
            </div>
        </div>
    );
}
