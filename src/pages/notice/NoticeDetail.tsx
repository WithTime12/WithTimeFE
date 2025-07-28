import { useLocation, useNavigate } from 'react-router-dom';

export default function NoticeDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, date, content } = location.state || {};

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10">
            {/* 타이틀 */}
            <h1 className="mb-8 font-heading2">공지사항</h1>

            {/* 공지 제목 + 날짜 */}
            <div className="border-y border-default-gray-400 py-4 mb-8">
                <p className="font-heading3 mb-1">{title}</p>
                <p className="font-body1 text-default-gray-500">{date}</p>
            </div>

            {/* 본문 */}
            <div className="whitespace-pre-line leading-relaxed mb-12 font-body2">{content || '내용이 없습니다.'}</div>

            {/* 목록으로 돌아가기 */}
            <div>
                <button onClick={() => navigate('/notice')} className="px-6 py-2 rounded-full bg-primary-500 text-white">
                    목록으로 돌아가기
                </button>
            </div>
        </div>
    );
}
