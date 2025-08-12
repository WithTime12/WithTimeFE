import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { useWeatherForecast, useWeatherForecastFormat } from '@/hooks/home/useWeather';

import Button from '@/components/common/Button';
import MainCard from '@/components/home/mainCard';

import Sun from '@/assets/icons/weather/sun.svg?react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

// 날씨 데이터 타입 정의 (인터페이스 이름 규칙 준수)
interface IWeatherForecast {
    date: string;
    weather: string;
    temperature: string;
    precipitation: number;
    description: string;
    emoji: string;
    keywords: string[];
}

function DateRecommend() {
    const [date, setDate] = useState(0);

    // 날씨 예보 데이터 (이번 주)
    const startDate = '2024-07-09';
    const endDate = '2024-07-15';
    const { data: forecastData, isLoading: forecastLoading } = useWeatherForecast(startDate, endDate);
    const formattedForecasts = useWeatherForecastFormat(forecastData);

    // 선택된 날짜의 날씨 정보
    const selectedForecast = formattedForecasts[date] || null;

    // 강수확률 차트 데이터
    const rainData = {
        labels:
            formattedForecasts.length > 0
                ? formattedForecasts.map((f: IWeatherForecast) => f.date)
                : ['7월 9일', '7월 10일', '7월 11일', '7월 12일', '7월 13일', '7월 14일', '7월 15일'],
        datasets: [
            {
                label: '강수확률',
                data: formattedForecasts.length > 0 ? formattedForecasts.map((f: IWeatherForecast) => f.precipitation) : [10, 30, 10, 45, 70, 45, 90],
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
                    font: {
                        weight: 'bold' as const,
                        size: 12,
                    },
                    formatter: (value: number) => `${value}%`,
                },
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#616161',
                    font: {
                        size: 12,
                        weight: 500,
                    },
                },
                drawBorder: false,
                drawOnChartArea: false,
                border: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                },
                display: false,
                grid: {
                    display: false,
                },
            },
        },
    };

    // 선택된 날짜의 날씨에 따른 추천 태그 생성
    const getWeatherRecommendations = () => {
        if (selectedForecast) {
            const weather = selectedForecast.weather.toLowerCase();
            const temp = selectedForecast.temperature;

            if (weather.includes('맑') || weather.includes('clear')) {
                if (temp.includes('25') || temp.includes('30')) {
                    return ['#실내추천', '#카페데이트', '#시원한하루'];
                } else {
                    return ['#야외활동', '#산책', '#피크닉'];
                }
            } else if (weather.includes('비') || weather.includes('rain')) {
                return ['#실내추천', '#영화관', '#카페데이트'];
            } else if (weather.includes('구름') || weather.includes('cloud')) {
                return ['#실내외겸용', '#카페데이트', '#산책'];
            }
        }

        // 기본값
        return ['#실내추천', '#카페데이트', '#시원한하루'];
    };

    // 선택된 날짜의 날씨 설명 텍스트 생성
    const getWeatherDescription = () => {
        if (selectedForecast) {
            return selectedForecast.description;
        }
        return '맑고 무더운 날';
    };

    // 선택된 날짜의 날씨에 따른 설명 텍스트 생성
    const getWeatherExplanation = () => {
        if (selectedForecast) {
            const weather = selectedForecast.weather.toLowerCase();
            const temp = selectedForecast.temperature;

            if (weather.includes('맑') && (temp.includes('25') || temp.includes('30'))) {
                return (
                    <>
                        <span className="text-primary-700 font-bold">맑은 하늘</span>과 <span className="text-primary-700 font-bold">무더운 날씨</span>가 기승을
                        부려요.
                        <br />
                        우산 없이도 걱정 없어요.
                        <br />
                        시원한 음료와 함께 실내 데이트가 좋아요.
                    </>
                );
            } else if (weather.includes('비')) {
                return (
                    <>
                        <span className="text-primary-700 font-bold">비 오는 날씨</span>예요.
                        <br />
                        우산을 챙기고 실내 데이트를 추천해요.
                        <br />
                        카페나 영화관에서 즐거운 시간을 보내세요.
                    </>
                );
            } else if (weather.includes('구름')) {
                return (
                    <>
                        <span className="text-primary-700 font-bold">흐린 날씨</span>네요.
                        <br />
                        실내외 겸용으로 데이트하기 좋아요.
                        <br />
                        카페에서 시작해서 산책도 즐겨보세요.
                    </>
                );
            } else {
                return (
                    <>
                        <span className="text-primary-700 font-bold">좋은 날씨</span>네요!
                        <br />
                        야외 활동하기 좋은 날이에요.
                        <br />
                        산책이나 피크닉을 즐겨보세요.
                    </>
                );
            }
        }

        // 기본값
        return (
            <>
                <span className="text-primary-700 font-bold">맑은 하늘</span>과 <span className="text-primary-700 font-bold">무더운 날씨</span>가 기승을 부려요.
                <br />
                우산 없이도 걱정 없어요.
                <br />
                시원한 음료와 함께 실내 데이트가 좋아요.
            </>
        );
    };

    // 날짜 버튼 클릭 핸들러
    const handleDateClick = (idx: number) => {
        setDate(idx);
        if (formattedForecasts[idx]) {
            // setSelectedDate(formattedForecasts[idx].date); // 사용하지 않음
        }
    };

    return (
        <MainCard>
            <div className="flex flex-col sm:px-[40px] px-[20px] py-[40px] justify-center h-full gap-[30px] sm:gap-[20px] w-full">
                {/* 상단 텍스트 */}
                <div className="flex items-center justify-between sm:flex-row flex-col">
                    <div className="text-2xl font-bold whitespace-nowrap">이번 주 강남구 데이트 추천</div>
                    <button className="sm:mt-1 mt-4 text-sm text-black underline sm:self-center self-end">장소 변경하기</button>
                </div>

                {/* 날짜 버튼 */}
                <div className="flex gap-1 w-full overflow-x-scroll no-scrollbar">
                    {rainData.labels.map((data: string, idx: number) => (
                        <Button
                            onClick={() => handleDateClick(idx)}
                            key={data}
                            size="small"
                            variant="white"
                            className={`text-xs ${idx === date ? 'bg-primary-500 text-white' : 'bg-default-gray-200 text-default-gray-700'}`}
                        >
                            {data}
                        </Button>
                    ))}
                </div>

                {/* 날씨 설명 */}
                <div className="flex justify-evenly items-center w-full sm:gap-4 md:gap-2 gap-10 sm:flex-row flex-col">
                    <div className="flex flex-col items-start w-fit">
                        <div className="flex flex-row items-center mb-4">
                            <Sun fill="#616161" className="w-12 h-12 mb-1" />
                            <span className="text-[#616161] font-medium mb-1 ml-3 text-[25px]">
                                {forecastLoading ? '날씨 로딩 중...' : getWeatherDescription()}
                            </span>
                        </div>
                        <div className="flex gap-2 whitespace-nowrap">
                            {getWeatherRecommendations().map((tag, index) => (
                                <span key={index} className="bg-default-gray-200 text-default-gray-700 rounded-full px-2 py-1 text-xs border border-[#616161]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="sm:flex hidden w-[1px] h-[149px] border-[0.5px] border-default-gray-400" />

                    <div className="text-m text-default-gray-700 items-center ml-2 whitespace-nowrap w-fit">{getWeatherExplanation()}</div>
                </div>

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
