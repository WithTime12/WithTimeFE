import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { TNoticeItem } from '@/types/notice/notice';

import EditableInputBox from '@/components/common/EditableInputBox';
import Navigator from '@/components/common/navigator';

import { fetchNotices } from '@/api/notice/notice';

const categories = ['서비스 안내', '시스템 안내'];

export default function Notice() {
    const [searchValue, setSearchValue] = useState(''); //검색어 상태
    const [activeCategory, setActiveCategory] = useState(categories[0]); //선택된 카테고리
    const [currentPage, setCurrentPage] = useState(1);

    const [noticeList, setNoticeList] = useState<TNoticeItem[]>([]); // 공지사항 리스트
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const itemsPerPage = 10;

    // 백엔드에 넘길 카테고리 키 - 영어 변환
    const categoryKey = activeCategory === '서비스 안내' ? 'SERVICE' : 'SYSTEM';

    // 컴포넌트 마운트 시, 카테고리/페이지 변경 시 -> API 호출
    useEffect(() => {
        const getNotices = async () => {
            setLoading(true);
            try {
                // 공지사항 목록 요청
                const response = await fetchNotices({
                    category: categoryKey,
                    page: currentPage - 1,
                    size: itemsPerPage,
                });

                // 공지 목록과 페이지 수 설정 (빈 배열도 허용)
                setNoticeList(response.result.noticeList ?? []);
                setTotalPages(response.result.totalPages ?? 1);
            } catch (err) {
                // 오류 처리
                setError('공지사항을 불러오는 데 실패했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getNotices(); // 함수 실행
    }, [activeCategory, currentPage]); // 의존성 배열 - 카테고리/페이지 변경 시마다 재호출

    // 검색어 필터링 적용된 공지사항
    const filteredNotices = noticeList.filter((notice) => notice.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10">
            <h1 className="mb-8 font-heading2">공지사항</h1>

            {/* 검색 */}
            <EditableInputBox
                mode="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearchClick={() => {}}
                placeholder="찾으시는 내용을 입력해주세요."
                className="mb-8"
            />

            {/* 카테고리 */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setActiveCategory(category);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                            activeCategory === category ? 'bg-primary-500 text-white' : 'bg-default-gray-400 text-default-gray-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 공지 없을 때 메시지 */}
            {!loading && !error && filteredNotices.length === 0 && <p className="text-center text-default-gray-500">공지사항이 없습니다.</p>}

            {/* 공지 리스트 */}
            <ul className="divide-y divide-default-gray-400 mb-10">
                {filteredNotices.map((notice) => (
                    <li key={notice.noticeId} className="py-4">
                        <Link to={`/notice/${notice.noticeId}`} className="flex items-center justify-between">
                            <span className="font-body2 text-default-gray-800">{notice.title}</span>
                            <span className="text-sm text-default-gray-500">{new Date(notice.createdAt).toLocaleDateString()}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <Navigator
                    current={currentPage}
                    end={totalPages}
                    onClick={(page) => {
                        setCurrentPage(page); //페이지 변경
                    }}
                />
            )}
        </div>
    );
}
