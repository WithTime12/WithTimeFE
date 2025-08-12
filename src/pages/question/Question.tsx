// src/pages/Question.tsx
import { useState } from 'react';

import EditableInputBox from '@/components/common/EditableInputBox';
import Navigator from '@/components/common/navigator';
import FAQItem from '@/components/faq/FAQItem';

// 질문 카테고리
const categories = ['서비스 이용 방법', '추천 알고리즘 관련', '기능 및 사용성', '예약/일정 관리', '기타/문의 및 오류신고', '계정 및 개인정보'];

// 임시 질문 데이터 넣음
const allQuestions = [
    {
        category: '서비스 이용 방법',
        question: '추천은 어떻게 받나요?',
        answer: `WithTime에서는 단 몇 가지 정보만 입력하면 자동으로 데이트 코스를 추천받을 수 있어요! 
        
        언제 만나는지 
        – 데이트 날짜와 만날 시간을 입력해 주세요 
        – 시간대에 맞는 코스를 자동으로 추천해드려요
        
        어디서 만나는지
        – 현재 위치 또는 원하는 지역을 설정해 주세요 
        – 상대방 근처나 여행지도 선택할 수 있어요

        누구랑 어떤 분위기로 
        – 데이트 상대(연인, 친구 등)와 
        – 가볍게 / 감성적 등 원하는 분위기를 골라 주세요

        우리만의 데이트 취향 테스트 결과 반영! 
        – 사용자의 데이트 스타일과 취향 유형을 기반으로 
        – 더 개인화된 맞춤 추천이 제공됩니다

        추천이 마음에 들지 않으면? 
        – ‘다시 추천받기’ 버튼으로 새로운 코스를 받아보세요!`,
    },
    {
        category: '서비스 이용 방법',
        question: 'WithTime은 앱이 아닌 웹으로만 사용 가능한가요?',
        answer: '네 웹 기반으로만 사용 가능합니다',
    },
];

export default function Question() {
    const [searchValue, setSearchValue] = useState('');
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openedIndex, setOpenedIndex] = useState<number | null>(null);

    const itemsPerPage = 10; // 페이지당 항목 수

    const filteredQuestions = allQuestions.filter((q) => q.category === activeCategory && q.question.toLowerCase().includes(searchValue.toLowerCase()));

    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    const paginatedQuestions = filteredQuestions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                }}
                onSearchClick={() => {}}
                placeholder="내용을 검색하세요"
                className="mb-8"
            />

            {/* 카테고리 버튼 */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setActiveCategory(category);
                            setCurrentPage(1);
                            setOpenedIndex(null);
                        }}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                            activeCategory === category ? 'bg-primary-500 text-white' : 'bg-default-gray-400 text-default-gray-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 질문 리스트 */}
            <ul className="divide-y divide-default-gray-400 mb-10">
                {paginatedQuestions.map((item, index) => (
                    <FAQItem key={index} item={item} isOpen={openedIndex === index} onToggle={() => setOpenedIndex(openedIndex === index ? null : index)} />
                ))}
            </ul>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <Navigator
                    current={currentPage}
                    end={totalPages}
                    onClick={(page) => {
                        setCurrentPage(page);
                        setOpenedIndex(null); // 페이지 전환할 때 펼친 질문 초기화
                    }}
                />
            )}
        </div>
    );
}
