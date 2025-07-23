import { useState } from 'react';
import { Link } from 'react-router-dom';

import EditableInputBox from '@/components/common/EditableInputBox';

import Forward from '@/assets/icons/default_arrows/arrow_forward.svg?react';

const categories = ['서비스 안내', '시스템 안내'];

const dummyNotices = [
    { category: '서비스 안내', title: '서비스 점검 안내 (06월 20일 02:00~04:00)', date: '2025.06.09' },
    { category: '서비스 안내', title: "신규 기능 '코스 저장하기' 오픈 안내", date: '2025.06.09' },
    {
        category: '서비스 안내',
        title: '데이트 추천 정확도 향상을 위한 업데이트 공지',
        date: '2025.06.09',
        content: `안녕하세요, WithTime 팀입니다.

항상 WithTime을 이용해주시는 모든 사용자 여러분께 진심으로 감사드립니다.
 보다 더 정확하고 만족스러운 데이트 코스를 추천해드리기 위해,아래와 같은 기능 개선 및 시스템 업데이트를 진행하였음을 알려드립니다.

🔧 주요 업데이트 내용
1. 사용자 취향 기반 알고리즘 개선 
기존에는 간단한 지역 및 활동 선호도 중심으로 코스를 구성했다면, 
이번 업데이트부터는 시간대, 최근 행동 패턴, 선택 취소된 장소 이력 등 
더 정밀한 데이터를 분석하여 추천의 정확도를 높였습니다.

2. 상황별 추천 강화 
- 비 오는 날에는 실내 데이트 중심으로 
- 일정 시간이 짧을 경우, 이동 거리를 고려한 코스 구성 
이처럼 날씨, 이동 시간, 데이트 시간대를 함께 반영하도록 개선했습니다.

3. 실시간 트렌드 반영 
주요 지역별 인기 급상승 장소나 SNS 상에서 언급된 핫플레이스 정보를 
추천 코스에 반영하여, 최신 트렌드를 더 빠르게 만나보실 수 있습니다.

🎯 기대 효과
- "오늘 뭐하지?" 고민할 시간 없이 상황 맞춤형 코스를 자동 추천
- MBTI P 유형 사용자도 만족할 만큼 빠르고 간단한 코스 구성
- 더 이상 ‘나랑 안 맞는 장소 추천’으로 불편하지 않도록 개선

📅 적용 일시
- 2025년 6월 21일(금) 00:00부터 순차 적용 예정입니다.

이번 업데이트는 사용자 여러분의 피드백을 바탕으로 진행되었습니다.
앞으로도 더 나은 서비스 제공을 위해 지속적으로 개선해나가겠습니다.
사용 중 불편한 점이나 건의 사항이 있다면, 언제든지 고객센터 또는 [문의하기]를 통해 알려주세요.
감사합니다.

WithTime 팀 드림`,
    },
    { category: '서비스 안내', title: '비회원 기능 이용 제한 관련 안내', date: '2025.06.09' },
    { category: '서비스 안내', title: '지도 기반 추천 기능 일시 중단 안내', date: '2025.06.09' },
    { category: '서비스 안내', title: '지도 기반 추천 기능 일시 중단 안내', date: '2025.06.09' },
    { category: '서비스 안내', title: '지도 기반 추천 기능 일시 중단 안내', date: '2025.06.09' },
    { category: '시스템 안내', title: '일부 브라우저에서 발생하는 오류 관련 안내', date: '2025.06.09' },
    { category: '시스템 안내', title: '추천 코스 반영 기준 변경 안내', date: '2025.06.09' },
    { category: '시스템 안내', title: '회원가입 약관 일부 변경 안내', date: '2025.06.09' },
];

export default function Notice() {
    const [searchValue, setSearchValue] = useState('');
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 필터링 + 페이징
    const filteredNotices = dummyNotices.filter(
        (notice) => notice.category === activeCategory && notice.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
    const paginatedNotices = filteredNotices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10">
            <h1 className="mb-8 font-heading2">공지사항</h1>

            {/* 검색 */}
            <EditableInputBox
                mode="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearchClick={() => console.log('검색 실행:', searchValue)}
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

            {/* 공지 리스트 */}
            <ul className="divide-y divide-default-gray-400 mb-10">
                {paginatedNotices.map((notice, index) => (
                    <li key={index} className="py-4">
                        <Link to={`/notice/${index}`} state={notice} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="font-body2 text-default-gray-800">{notice.title}</span>
                            </div>
                            <span className="text-sm text-default-gray-500">{notice.date}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            {totalPages >= 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-6 h-6 text-sm font-semibold text-center ${currentPage === i + 1 ? 'text-black' : 'text-gray-400'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    {currentPage < totalPages && (
                        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="w-6 h-6 text-center text-black">
                            <Forward className="w-4 h-4 fill-current text-default-gray-500" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
