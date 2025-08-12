// src/components/home/dateRecommend.tsx
import { type ComponentType, type SVGProps, useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { chartOptions } from '@/constants/chartOptions';

import { getNextSevenDay } from '@/utils/getNextSevenDay';
import { getTodayString } from '@/utils/getTodayString';
import { normalizeEmojiKey } from '@/utils/normalizeEmojiKey';
import { getWeatherSentence } from '@/utils/weatherMessage';

import { useGetUserRegion } from '@/hooks/home/useUserRegion';
import { useRainyInfo, useWeatherForecast } from '@/hooks/home/useWeather';

import Button from '@/components/common/Button';
import MainCard from '@/components/home/mainCard';

import { MODAL_TYPES } from '../common/modalProvider';

import Cloud from '@/assets/icons/weather/cloud.svg?react';
import Rain from '@/assets/icons/weather/rain.svg?react';
import Snow from '@/assets/icons/weather/snow.svg?react';
import Sun from '@/assets/icons/weather/sun.svg?react';
import Shower from '@/assets/icons/weather/sunShower.svg?react';
import useModalStore from '@/store/useModalStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

const EMOJI_KEY_ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: Rain,
    shower: Shower,
    snowy: Snow,
};

function DateRecommend() {
    const [dateIdx, setDateIdx] = useState(0);
    const { data } = useGetUserRegion();
    // 기준 날짜/지역
    const startDate = getTodayString();
    const regionId = data?.result.regionId;

    const { data: forecastData, isLoading: forecastLoading } = useWeatherForecast({ startDate, regionId: regionId! });
    const { data: rainyData, isLoading: rainyLoading } = useRainyInfo({ startDate, regionId: regionId! });

    const safeStartDate = rainyData?.result?.startDate ?? startDate;
    const dateList = useMemo(() => getNextSevenDay(safeStartDate), [safeStartDate]);

    // 차트 데이터: 로딩/초기엔 빈 배열
    const rainData = useMemo(() => {
        const values = rainyData?.result?.dailyPrecipitations?.map((f: { precipitationProbability: number }) => f.precipitationProbability) ?? [];
        return {
            labels: dateList,
            datasets: [
                {
                    label: '강수확률',
                    data: values,
                    borderColor: '#3FA495',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: '#ffffff',
                    fill: false,
                    tension: 0,
                    datalabels: {
                        align: 'end' as const,
                        anchor: 'end' as const,
                        offset: 2,
                        color: '#c3c3c3',
                        font: { weight: 'bold' as const, size: 12 },
                        formatter: (value: number) => `${value}%`,
                    },
                },
            ],
        };
    }, [dateList, rainyData]);
    const { openModal } = useModalStore();
    const currentRec = forecastData?.result?.dailyRecommendations?.[dateIdx];
    const rawKey = currentRec?.emoji;
    const iconKey = normalizeEmojiKey(rawKey);
    const Icon = EMOJI_KEY_ICON_MAP[iconKey] ?? Sun;

    useEffect(() => {
        if (dateIdx >= dateList.length) setDateIdx(0);
    }, [dateIdx, dateList.length]);

    if (rainyLoading || forecastLoading) {
        return (
            <MainCard>
                <ClipLoader />
            </MainCard>
        );
    }
    return (
        <MainCard>
            <div className="flex flex-col sm:px-[40px] px-[20px] py-[40px] justify-center h-full gap-[30px] sm:gap-[20px] w-full">
                {/* 상단 텍스트 */}
                <div className="flex items-center justify-between sm:flex-row flex-col">
                    <div className="text-2xl font-bold whitespace-nowrap">이번 주 {forecastData?.result?.region?.regionName ?? '지역'} 데이트 추천</div>
                    <button
                        type="button"
                        className="sm:mt-1 mt-4 text-sm text-black underline sm:self-center self-end"
                        onClick={() => openModal(MODAL_TYPES.RegionModal)}
                    >
                        장소 변경하기
                    </button>
                </div>

                {/* 날짜 버튼 */}
                <div className="flex gap-1 w-full overflow-x-scroll no-scrollbar">
                    {dateList.map((d, idx) => (
                        <Button
                            onClick={() => setDateIdx(idx)}
                            key={d}
                            size="small"
                            variant="white"
                            className={`text-xs ${idx === dateIdx ? 'bg-primary-500 text-white' : 'bg-default-gray-200 text-default-gray-700'}`}
                        >
                            {d}
                        </Button>
                    ))}
                </div>

                {/* 날씨 설명 */}
                <div className="flex items-center w-full sm:gap-4 md:gap-2 gap-10 sm:flex-row flex-col">
                    <div className="flex flex-col items-start min-w-[300px] max-w-[320px] px-4">
                        <div className="flex flex-row items-center mb-4 w-full">
                            <Icon key={iconKey} fill="#616161" className="w-12 h-12 mb-1" aria-label={`weather-icon-${iconKey || 'sun'}`} />
                            <span className="text-[#616161] font-medium mb-1 ml-3 text-[25px] text-nowrap ">
                                {forecastLoading
                                    ? '날씨 로딩 중...'
                                    : currentRec
                                      ? getWeatherSentence({
                                            weather: currentRec.weatherType!,
                                            temp: currentRec.tempCategory!,
                                        })
                                      : '날씨 정보 없음'}
                            </span>
                        </div>

                        <div className="flex gap-2 whitespace-nowrap">
                            {(currentRec?.keywords ?? []).map((tag: string, index: number) => (
                                <span key={index} className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="sm:flex hidden w-[1px] h-[149px] border-[0.5px] border-default-gray-400" />

                    <div className="text-m text-default-gray-700 items-center ml-2 whitespace-wrap w-fit">
                        {currentRec?.message ?? (forecastLoading ? '로드 중...' : '메시지 없음')}
                    </div>
                </div>

                {/* 차트 */}
                <div className="flex flex-col w-full">
                    <div className="text-base font-semibold text-[#616161] mb-4">이번주 강수확률 (%)</div>
                    <div className="flex justify-center h-[200px] w-full self-center">
                        <Line data={rainData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </MainCard>
    );
}

export default DateRecommend;
