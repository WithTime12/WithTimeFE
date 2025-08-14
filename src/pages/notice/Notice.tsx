import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import type { TNoticeItem } from '@/types/notice/notice';

import { formatDateDot } from '@/utils/date';

import { useNotice } from '@/hooks/notice/useNotice';

import EditableInputBox from '@/components/common/EditableInputBox';
import Navigator from '@/components/common/navigator';

const categories = ['서비스 안내', '시스템 안내'] as const;

export default function Notice() {
    const [searchValue, setSearchValue] = useState('');
    const [keyword, setKeyword] = useState('');

    const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('서비스 안내');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const categoryKey: 'SERVICE' | 'SYSTEM' = activeCategory === '서비스 안내' ? 'SERVICE' : 'SYSTEM';

    // 검색 여부
    const isSearching = keyword.trim().length > 0;

    const listParams = useMemo(() => ({ category: categoryKey, page: currentPage - 1, size: itemsPerPage }), [categoryKey, currentPage]);
    const searchParams = useMemo(() => ({ keyword, category: categoryKey, page: currentPage - 1, size: itemsPerPage }), [keyword, categoryKey, currentPage]);

    const { useGetNotices, useSearchNotices } = useNotice();
    const listQuery = useGetNotices(listParams, { enabled: !isSearching });
    const searchQuery = useSearchNotices(searchParams, { enabled: isSearching });

    const { data, isLoading, isError } = isSearching ? searchQuery : listQuery;

    const list = (data?.result?.noticeList ?? []) as TNoticeItem[];
    const totalPages = data?.result?.totalPages ?? 1;

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10 text-default-gray-800">
            <h1 className="mb-8 font-heading2">공지사항</h1>

            {/* 검색창 */}
            <EditableInputBox
                mode="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearchClick={() => {
                    setKeyword(searchValue.trim());
                    setCurrentPage(1);
                }}
                placeholder="검색어를 입력하세요"
                className="mb-8"
            />

            {/* 카테고리 버튼 */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => {
                            setActiveCategory(c);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                            activeCategory === c ? 'bg-primary-500 text-white' : 'bg-default-gray-400 text-default-gray-700'
                        }`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {/* 상태 */}
            {isLoading && <p className="text-center font-body1 text-default-gray-500">로딩 중</p>}
            {isError && <p className="text-center font-body1 text-default-gray-500">불러오기에 실패했습니다.</p>}
            {!isLoading && !isError && list.length === 0 && <p className="text-center font-body1 text-default-gray-500">등록된 공지사항이 없습니다.</p>}

            {/* 목록 */}
            <ul className="divide-y divide-default-gray-400 mb-10">
                {list.map((n) => (
                    <li key={n.noticeId} className="py-4">
                        <Link to={`/notice/${n.noticeId}`} className="flex items-center justify-between">
                            <span className="font-body2 text-default-gray-800">{n.title}</span>
                            <p className="font-body2 text-default-gray-500">{formatDateDot(n.createdAt)}</p>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            {totalPages > 1 && <Navigator current={currentPage} end={totalPages} onClick={(p) => setCurrentPage(p)} />}
        </div>
    );
}
