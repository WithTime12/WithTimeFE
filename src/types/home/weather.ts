import type { TempCategory, WeatherType } from '@/constants/weather';

import type { TCommonResponse } from '../common/common';

export type TGetWeeklyWeatheerRecommendationRequest = {
    startDate: string;
    regionId: number;
};
type TDailyRecommendations = {
    forecastDate: string;
    weatherType: WeatherType;
    tempCategory: TempCategory;
    precipCategory: string;
    message: string;
    emoji: string;
    keywords: string[];
};

type TRegion = {
    regionId: number;
    regionName: string;
    landRegCode: string;
    tempRegCode: string;
};
export type TGetWeeklyWeatheerRecommendationResponse = TCommonResponse<{
    region: TRegion;
    startDate: string;
    endDate: string;
    dailyRecommendations: TDailyRecommendations[];
    totalDays: number;
    message: string;
}>;

export type TGetPrecipitationRequest = {
    startDate: string;
    regionId: number;
};
export type TGetPrecipitationResponse = TCommonResponse<{
    retion: TRegion;
    startDate: string;
    endDate: string;
    dailyPrecipitations: TDailyPrecipitations[];
    totalDays: number;
    message: string;
}>;

type TDailyPrecipitations = {
    forecastDate: string;
    precipitationProbability: number;
};
