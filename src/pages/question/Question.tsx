import { useMemo, useState } from 'react';
import { keepPreviousData } from '@tanstack/react-query';

import type { TFaqCategory, TFaqItem } from '@/types/faq/faq';

import { useGetFaqs, useSearchFaqs } from '@/hooks/faq/useFaq';

import EditableInputBox from '@/components/common/EditableInputBox';
import Navigator from '@/components/common/navigator';
import FAQItem from '@/components/faq/FAQItem';

const CATEGORY_MAP = [
    { label: '서비스 이용 방법', value: 'USAGE' },
    { label: '추천 알고리즘 관련', value: 'ALGORITHM' },
    { label: '기능 및 사용성', value: 'FEATURE' },
    { label: '예약/일정 관리', value: 'SCHEDULE' },
    { label: '기타/문의 및 오류신고', value: 'ERROR' },
    { label: '계정 및 개인정보', value: 'ACCOUNT' },
] as const;

export default function Question() {
    const [searchValue, setSearchValue] = useState('');
    const [active, setActive] = useState<(typeof CATEGORY_MAP)[number]>(CATEGORY_MAP[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openedIndex, setOpenedIndex] = useState<number | null>(null);

    const size = 10;
    const hasKeyword = searchValue.trim().length > 0;

    // 목록 API
    const paramsList = useMemo(
        () => ({
            category: active.value as TFaqCategory,
            page: currentPage - 1,
            size,
        }),
        [active.value, currentPage],
    );

    // 검색 API
    const paramsSearch = useMemo(
        () => ({
            keyword: searchValue,
            category: active.value as TFaqCategory,
            page: currentPage - 1,
            size,
        }),
        [searchValue, active.value, currentPage],
    );

    // 두 훅을 항상 호출 - enabled로 제어
    const listQuery = useGetFaqs(paramsList, {
        enabled: !hasKeyword,
        placeholderData: keepPreviousData,
    });

    const searchQuery = useSearchFaqs(paramsSearch, {
        enabled: hasKeyword,
        placeholderData: keepPreviousData,
    });

    const activeQuery = hasKeyword ? searchQuery : listQuery;
    const { data, isLoading, isError } = activeQuery;

    const serverList = (data?.result?.faqList ?? []) as TFaqItem[];
    const totalPages = data?.result?.totalPages ?? 1;

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10 text-default-gray-800">
            {/* 제목 */}
            <h1 className="mb-8 font-heading2">자주 묻는 질문</h1>

            {/* 검색창 */}
            <EditableInputBox
                mode="search"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    setCurrentPage(1);
                    setOpenedIndex(null);
                }}
                onSearchClick={() => {}}
                placeholder="내용을 검색하세요"
                className="mb-8"
            />

            {/* 카테고리 버튼 */}
            <div className="flex flex-wrap gap-2 mb-8">
                {CATEGORY_MAP.map((c) => (
                    <button
                        type="button"
                        key={c.value}
                        onClick={() => {
                            setActive(c);
                            setCurrentPage(1);
                            setOpenedIndex(null);
                        }}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                            active.value === c.value ? 'bg-primary-500 text-white' : 'bg-default-gray-400 text-default-gray-700'
                        }`}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {/* 상태 표시 */}
            {isLoading && <p className="text-center font-body1 text-default-gray-500">로딩 중</p>}
            {isError && <p className="text-center font-body1 text-default-gray-500">불러오기에 실패했습니다.</p>}
            {!isLoading && !isError && serverList.length === 0 && <p className="text-center font-body1 text-default-gray-500">등록된 질문이 없습니다.</p>}

            {/* 리스트 */}
            <ul className="divide-y divide-default-gray-400 mb-10">
                {serverList.map((item, index) => (
                    <FAQItem
                        key={item.faqId}
                        item={{ ...item, categoryLabel: active.label }}
                        isOpen={openedIndex === index}
                        onToggle={() => setOpenedIndex(openedIndex === index ? null : index)}
                    />
                ))}
            </ul>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <Navigator
                    current={currentPage}
                    end={totalPages}
                    onClick={(p) => {
                        setCurrentPage(p);
                        setOpenedIndex(null);
                    }}
                />
            )}
        </div>
    );
}
