import { useState } from 'react';

import Button from '@/components/common/Button';
import MainCard from '@/components/home/mainCard';

import Sun from '@/assets/icons/weather/sun.svg?react';

function DateRecommend() {
    const [date, setDate] = useState(0);
    const rainData = [
        { day: '7월 9일', percent: 10 },
        { day: '7월 10일', percent: 30 },
        { day: '7월 11일', percent: 10 },
        { day: '7월 12일', percent: 45 },
        { day: '7월 13일', percent: 70 },
        { day: '7월 14일', percent: 45 },
        { day: '7월 15일', percent: 90 },
    ];

    return (
        <MainCard>
            <div className="flex flex-col sm:px-[40px] px-[20px] py-[40px] justify-center h-full gap-[20px] w-full">
                {/* 상단 텍스트 */}
                <div className="flex items-center justify-between sm:flex-row flex-col">
                    <div className="text-2xl font-bold whitespace-nowrap">이번 주 강남구 데이트 추천</div>
                    <button className="sm:mt-1 mt-4 text-sm text-black underline sm:self-center self-end">장소 변경하기</button>
                </div>

                {/* 날짜 버튼 */}
                <div className="flex gap-1 w-full overflow-x-scroll no-scrollbar">
                    {rainData.map((data, idx) => (
                        <Button
                            onClick={() => setDate(idx)}
                            key={data.day}
                            size="small"
                            variant="white"
                            className={`text-xs ${idx === date ? 'bg-primary-500 text-white' : 'bg-default-gray-200 text-default-gray-700'}`}
                        >
                            {data.day}
                        </Button>
                    ))}
                </div>

                {/* 날씨 설명 */}
                <div className="flex items-center w-full gap-4 xl:flex-row flex-col">
                    <div className="flex flex-col items-startr w-fit">
                        <div className="flex flex-row items-center mb-4">
                            <Sun fill="#616161" className="w-12 h-12 mb-1" />
                            <span className="text-[#616161] font-medium mb-1 ml-3 text-[25px]">맑고 무더운 날</span>
                        </div>
                        <div className="flex gap-2 whitespace-nowrap">
                            <span className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">#실내추천</span>
                            <span className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">
                                #카페데이트
                            </span>
                            <span className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">
                                #시원한하루
                            </span>
                        </div>
                    </div>

                    <div className="xl:flex hidden w-[1px] h-[149px] border-[0.5px] border-default-gray-400" />

                    <div className="flex-1 text-m text-default-gray-700 items-center ml-2 whitespace-nowrap">
                        <span className="text-primary-700 font-bold">맑은 하늘</span>과 <span className="text-primary-700 font-bold">무더운 날씨</span>가 기승을
                        부려요.
                        <br />
                        우산 없이도 걱정 없어요.
                        <br />
                        시원한 음료와 함께 실내 데이트가 좋아요.
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="text-base font-semibold text-[#616161] mb-4">이번주 강수확률 (%)</div>
                    <div className="relative w-full h-40">
                        {/* 부모 div에 고정 넓이 지정 */}
                        <svg viewBox="0 0 300 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            {/* 점 */}
                            {rainData.map((point, idx) => {
                                const x = (idx / (rainData.length - 1)) * 300;
                                const y = 100 - point.percent;
                                return <circle key={idx} cx={x} cy={y} r="1.5" fill="#14B8A6" />;
                            })}

                            {/* 선 */}
                            <polyline
                                fill="none"
                                stroke="#14B8A6"
                                strokeWidth="1"
                                points={rainData
                                    .map((point, idx) => {
                                        const x = (idx / (rainData.length - 1)) * 300;
                                        const y = 100 - point.percent;
                                        return `${x},${y}`;
                                    })
                                    .join(' ')}
                            />

                            {/* 텍스트 */}
                            {rainData.map((point, idx) => {
                                const x = (idx / (rainData.length - 1)) * 300;
                                const y = 100 - point.percent;
                                return (
                                    <g key={idx}>
                                        <text x={x} y={y - 6} fontSize="4" textAnchor="middle" fill="#333">
                                            {point.percent}%
                                        </text>
                                        <text x={x} y="98" fontSize="4" textAnchor="middle" fill="#616161">
                                            {point.day}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                </div>
            </div>
        </MainCard>
    );
}

export default DateRecommend;
