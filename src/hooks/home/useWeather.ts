import { useQuery } from '@tanstack/react-query';

import { getWeeklyWeatherRecommendation } from '../../api/home/weather';

// 주간 날씨 추천 훅
export const useWeatherForecast = (startDate: string, endDate: string) => {
    return useQuery({
        queryKey: ['weather-forecast', startDate, endDate],
        queryFn: () => getWeeklyWeatherRecommendation(startDate, endDate),
        staleTime: 10 * 60 * 1000, // 10분
        gcTime: 30 * 60 * 1000, // 30분
        retry: 3,
    });
};

// 날씨 데이터 포맷팅 훅
export const useWeatherForecastFormat = (data: any) => {
    if (!data?.result?.dailyRecommendations) {
        return [];
    }

    return data.result.dailyRecommendations.map((day: any) => ({
        date: day.forecastDate,
        weather: day.weatherType,
        temperature: day.tempCategory,
        precipitation: day.precipCategory === 'NONE' ? 0 : 30, // 임시 값
        description: day.message,
        emoji: day.emoji,
        keywords: day.keywords || [],
    }));
};
