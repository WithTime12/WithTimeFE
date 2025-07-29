import Button from '@/components/common/Button';
import MainCard from '@/components/home/mainCard';

import Sun from '@/assets/icons/weather/sun.svg?react';

function DateRecommend() {
    return (
        <MainCard>
            <div className="flex flex-col px-[56px] py-[40px] justifty-center h-full gap-[30px]">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">이번 주 강남구 데이트 추천</div>
                    <button className="mt-1 text-sm text-black underline">장소 변경하기</button>
                </div>
                {/* 날짜 버튼 */}
                <div className="flex gap-1">
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
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center mb-4">
                            <Sun fill="#616161" className="w-10 h-10 mb-3" />
                            <span className="text-[#616161] font-semibold mb-3 ml-3 text-[20px]">맑고 무더운 날</span>
                        </div>
                        <div className="flex gap-2 ml-9 ">
                            <span className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">#실내추천</span>
                            <span className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">
                                #카페데이트
                            </span>
                            <span className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">
                                #시원한하루
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 text-m text-default-gray-700 items-center ml-9 mt-5">
                        <span className="text-primary-700 font-bold">맑은 하늘</span>과 <span className="text-primary-700 font-bold">무더운 날씨</span>
                        가 기승을 부려요.
                        <br />
                        우산 없이도 걱정 없어요.
                        <br />
                        시원한 음료와 함께 실내 데이트가 좋아요.
                    </div>
                </div>
                {/* 그래프 (임시) */}
                <div className="flex flex-col">
                    <div className="text-sm font-medium text-[#616161] mt-7 ml-15">이번주 강수확률 (%)</div>
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
        </MainCard>
    );
}
export default DateRecommend;
