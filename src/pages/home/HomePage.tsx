import React, { useEffect, useState } from 'react';

import Button from '@/components/common/Button';

import sun from '@/assets/icons/weather/sun.svg';

import AddCircleBlank from '@/assets/icons/add-circle_Blank.svg?react';
import ArchiveBlank from '@/assets/icons/Archive_Blank.svg?react';
import ChevronBack from '@/assets/icons/default_arrows/chevron_back.svg?react';
import ChevronForward from '@/assets/icons/default_arrows/chevron_forward.svg?react';
import ramji from '@/images/animals/ramgi.png';
import scroll from '@/images/scroll.png';
import useModalStore from '@/store/useModalStore';

// 타입 정의
interface IKeyword {
    text: string;
    className: string;
}
interface ICoordinates {
    left: number;
    top: number;
}

interface IArea extends ICoordinates {
    width: number;
    height: number;
}

interface IPositionedKeyword {
    text: string;
    className: string;
    style: React.CSSProperties;
}

// 겹침 체크 함수: generatePositions보다 위로 이동
const isOverlapping = (newPos: ICoordinates, existingAreas: IArea[], textLength: number): boolean => {
    const margin = 5;
    const newWidth = textLength * 2;
    const newHeight = 3;

    return existingAreas.some((area: IArea) => {
        return !(
            newPos.left + newWidth + margin < area.left ||
            newPos.left - margin > area.left + area.width ||
            newPos.top + newHeight + margin < area.top ||
            newPos.top - margin > area.top + area.height
        );
    });
};
// 워드클라우드 컴포넌트
function WordCloudCard() {
    const keywords: IKeyword[] = [
        { text: '드라이브', className: 'text-4xl font-bold text-teal-700' },
        { text: '포토존', className: 'text-3xl font-bold text-teal-700' },
        { text: '카페', className: 'text-2xl font-bold text-teal-500' },
        { text: '감성', className: 'text-xl font-bold text-teal-600' },
        { text: '맛집', className: 'text-xl font-bold text-teal-600' },
        { text: '피크닉', className: 'text-lg text-teal-300' },
        { text: '영화관', className: 'text-lg text-teal-500' },
        { text: '산책', className: 'text-lg text-teal-300' },
        { text: '실내', className: 'text-base text-gray-400' },
        { text: '레저', className: 'text-base text-gray-400' },
        { text: '홍대', className: 'text-base text-gray-300' },
        { text: '전시', className: 'text-base text-gray-300' },
        { text: '성수', className: 'text-base text-gray-300' },
        { text: '가로수길', className: 'text-base text-gray-400' },
        { text: '행궁동', className: 'text-base text-gray-400' },
        { text: '레트로', className: 'text-base text-gray-200' },
        { text: '쇼핑', className: 'text-base text-gray-500' },
    ];

    const [positionedKeywords, setPositionedKeywords] = useState<IPositionedKeyword[]>([]);

    const generatePositions = (): IPositionedKeyword[] => {
        const positions: IPositionedKeyword[] = [];
        const usedAreas: IArea[] = [];

        keywords.forEach((keyword: IKeyword) => {
            let position: ICoordinates;
            let attempts = 0;

            do {
                position = {
                    left: Math.random() * 60 + 20,
                    top: Math.random() * 60 + 20,
                };
                attempts++;
            } while (attempts < 50 && isOverlapping(position, usedAreas, keyword.text.length));

            usedAreas.push({
                ...position,
                width:
                    keyword.text.length *
                    (keyword.className.includes('text-4xl')
                        ? 3
                        : keyword.className.includes('text-3xl')
                          ? 2.5
                          : keyword.className.includes('text-2xl')
                            ? 2
                            : keyword.className.includes('text-xl')
                              ? 1.5
                              : 1),
                height: 3,
            });

            positions.push({
                ...keyword,
                style: {
                    position: 'absolute',
                    left: `${position.left}%`,
                    top: `${position.top}%`,
                    transform: 'translate(-50%, -50%)',
                },
            });
        });

        return positions;
    };

    useEffect(() => {
        setPositionedKeywords(generatePositions());
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center h-full">
            <div className="text-xl font-bold text-gray-700 mb-6">이번주 인기 데이트 키워드 현황</div>

            <div className="relative w-full h-64 overflow-hidden bg-gray-50 rounded-lg flex items-center justify-center">
                {positionedKeywords.map((keyword, index) => (
                    <span key={index} className={keyword.className} style={keyword.style}>
                        {keyword.text}
                    </span>
                ))}
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className="bg-default-gray-100 min-h-screen">
            {/* ================== 메인 배너 ================== */}
            <div className="relative w-full">
                <img src={scroll} alt="배너" className="w-full h-[450px]" />

                {/* 내용 */}
                <div className="absolute inset-0 flex flex-col justify-start px-12 py-10 text-white z-10">
                    <div className="text-[20px] mb-5">오늘의 데이트 추천</div>
                    <div className="text-[30px] font-bold mb-5">서울 성수동 : 옛것과 새로운 것이 교차하는 하루</div>
                    <div className="mb-5">1960년대부터 조성된 오래된 공장 건물과 최근 벽돌 건물들의 분위기</div>
                    <div className="flex gap-5 mb-">
                        <Button
                            size="small"
                            variant="white"
                            className="bg-white border border-primary-500 text-black shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                        >
                            {' '}
                            #활발한 활동
                        </Button>
                        <Button
                            size="small"
                            variant="white"
                            className="bg-white border border-primary-500 text-black shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                        >
                            {' '}
                            #활발한 활동
                        </Button>
                        <Button
                            size="small"
                            variant="white"
                            className="bg-white border border-primary-500 text-black shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                        >
                            {' '}
                            #활발한 활동
                        </Button>
                    </div>
                </div>
                {/* 인디케이터/슬라이드 */}
                <div className="absolute top-6 right-8 flex items-center gap-2 z-20">
                    <div className="w-3 h-3 rounded-full bg-[#C3C3C3]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEFEFE]" />
                    <div className="w-3 h-3 rounded-full bg-[#C3C3C3]" />
                    <div className="w-3 h-3 rounded-full bg-[#C3C3C3]" />
                    <button className="ml-5 flex items-center justify-center w-8 h-8 text-white">
                        <ChevronBack className="w-6 h-6" />
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 text-white">
                        <ChevronForward className="w-6 h-6" />
                    </button>
                </div>
                {/*하단안내버튼*/}
                <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 z-20">
                    <Button
                        size="big-16"
                        variant="white"
                        className="w-[600px] h-[60px] !text-[16px] tracking-[0.5px] bg-white shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                    >
                        WithTime을 통해 원하시는 데이트 코스를 만들어보세요
                        <span className="ml-2">→</span>
                    </Button>
                </div>
            </div>

            {/*대시보드*/}
            <div className="ml-10 mt-20 text-2xl ">
                <span className=" font-bold text-[50px]">Madeleine</span>
                <span className="font-semibold text-[25px]"> 님의 WithTime</span>
            </div>
            <div className="max-w-9xl mx-10 mt-10 grid grid-cols-1 md:grid-cols-2 gap-15">
                {/* 좌측 카드 */}
                <div className="bg-white rounded-2xl shadow-[0_4px_12px_0_rgba(0,0,0,0.05),0_-4px_12px_0_rgba(0,0,0,0.05),4px_0_12px_0_rgba(0,0,0,0.05),-4px_0_12px_0_rgba(0,0,0,0.05)] p-10 flex flex-col gap-6 h-[300px] w-full">
                    {/* 상단: 캐릭터 + Flirt */}
                    <div className="flex items-center gap-8">
                        <img src={ramji} alt="캐릭터" className="w-50 h-50 rounded-xl bg-[#F6E6FF] object-cover object-top" />
                        <div>
                            <div className="text-3xl font-semibold mb-6 ml-10">Flirt</div>
                            <div className="text-[#616161] font-medium mb-1 ml-10">
                                다음 데이트 레벨 성장까지
                                <br />
                                <span className="text-primary-700 font-medium ">20점</span>의 데이트 활동이 필요합니다
                            </div>
                            {/* 진행바 */}
                            <div className="w-full h-6 bg-[#d6d6d6] rounded-full mt-4 ml-10 relative">
                                <div className="absolute top-1 ml-1 h-4 bg-primary-500 rounded-full " style={{ width: '65%' }} />
                            </div>
                        </div>
                    </div>
                    {/* 하단: 통계 영역 */}
                    <div className="grid grid-cols-2 gap-40 mt-20 h-[180px]">
                        {/* 왼쪽: 1번 + 2번 카드를 가로로 배치한 하나의 큰 div */}
                        <div className="bg-white rounded-xl shadow-[0_4px_12px_0_rgba(0,0,0,0.05),0_-4px_12px_0_rgba(0,0,0,0.05),4px_0_12px_0_rgba(0,0,0,0.05),-4px_0_12px_0_rgba(0,0,0,0.05)] p-3 w-[350px]">
                            <div className="grid grid-cols-2 p-3">
                                {/* 첫 번째 카드 */}
                                <div className="flex flex-col items-center justify-center w-full ">
                                    <div className="text-sm text-default-gray-700 mb-1">최근 1개월</div>
                                    <div className="text-xs text-default-gray-500 mb-2 text-center">
                                        WithTime 이용자
                                        <br />
                                        평균 데이트 횟수
                                    </div>
                                    <div className="text-3xl font-bold text-default-gray-800">4.6회</div>
                                </div>

                                {/* 두 번째 카드 */}
                                <div className="flex flex-col items-center justify-center w-[200px]">
                                    <div className="text-sm text-default-gray-700 mb-1">최근 1개월</div>
                                    <div className="text-xs text-default-gray-500 mb-2 text-center">
                                        WithTime 이용자
                                        <br />
                                        평균 데이트 횟수
                                    </div>
                                    <div className="text-3xl font-bold text-primary-700">2회</div>
                                </div>
                            </div>
                        </div>

                        {/* 오른쪽: 3번 카드 단독 */}
                        <div className="bg-white rounded-xl shadow-[0_4px_12px_0_rgba(0,0,0,0.05),0_-4px_12px_0_rgba(0,0,0,0.05),4px_0_12px_0_rgba(0,0,0,0.05),-4px_0_12px_0_rgba(0,0,0,0.05)] p-6 flex flex-col items-start justify-center">
                            <div className="flex items-start justify-start">
                                <ArchiveBlank className="w-8 h-8 stroke-[#000000] mb-2" />
                            </div>
                            <div className="text-m bold-medium text-[#616161] mb-1">내 데이트 코스를</div>
                            <div className="flex items-center gap-1">
                                <div className="text-xl font-bold text-primary-700">2,345명</div>
                                <div className="text-m bold-medium text-[#616161]">이 저장했어요.</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 우측 카드 */}
                <div className="bg-white rounded-2xl shadow-[0_4px_12px_0_rgba(0,0,0,0.05),0_-4px_12px_0_rgba(0,0,0,0.05),4px_0_12px_0_rgba(0,0,0,0.05),-4px_0_12px_0_rgba(0,0,0,0.05)] p-8 w-full h-[480px]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold">이번 주 강남구 데이트 추천</div>
                        <button className="mt-1 text-sm text-black underline">장소 변경하기</button>
                    </div>
                    {/* 날짜 버튼 */}
                    <div className="flex gap-1 mb-8">
                        <Button size="small" variant="white" className="bg-primary-500 text-white font-bold text-xs">
                            7월 9일
                        </Button>
                        <Button size="small" variant="white" className="bg-default-gray-200 text-default-gray-700 text-xs">
                            7월 10일
                        </Button>
                        <Button size="small" variant="white" className="bg-default-gray-200 text-default-gray-700 text-xs">
                            7월 11일
                        </Button>
                        <Button size="small" variant="white" className="bg-default-gray-200 text-default-gray-700 text-xs">
                            7월 12일
                        </Button>
                        <Button size="small" variant="white" className="bg-default-gray-200 text-default-gray-700 text-xs">
                            7월 13일
                        </Button>
                        <Button size="small" variant="white" className="bg-default-gray-200 text-default-gray-700 text-xs">
                            7월 14일
                        </Button>
                        <Button size="small" variant="white" className="bg-default-gray-200 text-default-gray-700 text-xs">
                            7월 15일
                        </Button>
                    </div>
                    {/* 날씨/해시태그/설명 */}
                    <div className="flex items-center gap-8 mb-4">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-row items-center mb-4">
                                <img src={sun} alt="태양" className="w-10 h-10 mb-3 fill-[#616161]" />
                                <span className="text-[#616161] font-semibold mb-3 ml-3 text-[20px]">맑고 무더운 날</span>
                            </div>
                            <div className="flex gap-2 ml-9 ">
                                <span className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">
                                    #실내추천
                                </span>
                                <span className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">
                                    #카페데이트
                                </span>
                                <span className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">
                                    #시원한하루
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 text-m text-default-gray-700 items-center ml-9 mt-5">
                            <span className="text-primary-700 font-bold">맑은 하늘</span>과 <span className="text-primary-700 font-bold">무더운 날씨</span>가
                            기승을 부려요.
                            <br />
                            우산 없이도 걱정 없어요.
                            <br />
                            시원한 음료와 함께 실내 데이트가 좋아요.
                        </div>
                    </div>
                    {/* 그래프 (임시) */}
                    <div>
                        <div className="text-sm font-medium text-[#616161] mt-7 ml-15 mb-2">이번주 강수확률 (%)</div>
                        <div className="mb-8 w-full h-32 bg-default-gray-200 rounded-xl flex items-end gap-2 px-4">
                            <div className="w-1/7 h-1/5 bg-primary-300 rounded-t" />
                            <div className="w-1/7 h-2/5 bg-primary-500 rounded-t" />
                            <div className="w-1/7 h-1/4 bg-primary-700 rounded-t" />
                            <div className="w-1/7 h-3/5 bg-primary-300 rounded-t" />
                            <div className="w-1/7 h-4/5 bg-primary-500 rounded-t" />
                            <div className="w-1/7 h-1/2 bg-primary-700 rounded-t" />
                            <div className="w-1/7 h-5/5 bg-primary-300 rounded-t" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ================== 데이터 현황 카드 ================== */}
            <div className="max-w-9xl mx-10 mt-10 grid grid-cols-1 md:grid-cols-2 gap-15">
                {/* 3번째 카드: 등록된 데이트 장소 수 */}
                <div className="p-10 flex flex-col items-center h-96">
                    <div className="text-xl font-bold mb-3 w-full ">WithTime 데이트 관련 현황</div>
                    <div className="text-primary-700 mb-6 w-full font-bold text-xs">WithTime에서 더 편리하게 데이트를 준비해보세요</div>
                    <div className="bg-white rounded-2xl shadow-[0_4px_12px_0_rgba(0,0,0,0.05),0_-4px_12px_0_rgba(0,0,0,0.05),4px_0_12px_0_rgba(0,0,0,0.05),-4px_0_12px_0_rgba(0,0,0,0.05)] p-8 w-full flex flex-col items-center">
                        <div className="text-xl font-bold text-[#616161] mb-6">WithTime에 등록된 데이트 장소 수</div>
                        <div className="flex items-end gap-8 w-full justify-center">
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-[#c3c3c3] mb-1">230</span>
                                <div className="h-16 w-10 bg-default-gray-400 mb-2 flex items-start justify-center" />
                                <div className="text-[#c3c3c3] mt-1">2022</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-[#c3c3c3] mb-1">430</span>
                                <div className="h-24 w-10 bg-default-gray-400 mb-2 flex items-start justify-center" />
                                <div className="text-[#c3c3c3] mt-1">2023</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-[#c3c3c3] mb-1">830</span>
                                <div className="h-36 w-10 bg-default-gray-400 mb-2 flex items-start justify-center" />
                                <div className="text-[#c3c3c3] mt-1">2024</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-[#c3c3c3] mb-1">1,230</span>
                                <div className="h-48 w-10 bg-default-gray-400 mb-2 flex items-start justify-center" />
                                <div className="text-[#c3c3c3] mt-1">2025</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 워드클라우드 카드 */}
                <div className="h-96 rounded-2xl shadow-[0_4px_12px_0_rgba(0,0,0,0.05),0_-4px_12px_0_rgba(0,0,0,0.05),4px_0_12px_0_rgba(0,0,0,0.05),-4px_0_12px_0_rgba(0,0,0,0.05)]">
                    {' '}
                    {/* WordCloudCard를 감싸는 div에도 동일한 높이 적용 */}
                    <WordCloudCard />
                </div>
            </div>
            {/* ================== 공지사항 카드 ================== */}
            <div className="max-w-8xl mx-auto mt-20 p-12 ml-7">
                <div className="bg-white rounded-2xl shadow-[0_4px_12px_0_rgba(0,0,0,0.05),0_-4px_12px_0_rgba(0,0,0,0.05),4px_0_12px_0_rgba(0,0,0,0.05),-4px_0_12px_0_rgba(0,0,0,0.05)] p-6 flex items-start justify-between">
                    <div>
                        <div className="text-xl font-bold mb-3">공지사항</div>
                        <ul className="text-default-gray-700 space-y-1">
                            <li>여름 맞이 피서 데이트 코스 추가 업데이트</li>
                            <li>슬기로운 데이트를 하고싶은 커플을 위한 이벤트</li>
                            <li>위티 사칭 웹사이트 및 보이스피싱 주의 안내</li>
                        </ul>
                    </div>
                    <button className="text-default-gray-800 font-semibold flex items-center gap-1 whitespace-nowrap">
                        전체보기 <AddCircleBlank className="w-4 h-4 stroke-[#000000]" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
