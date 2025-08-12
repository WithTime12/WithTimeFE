import type {
    TGetPrecipitationRequest,
    TGetPrecipitationResponse,
    TGetWeeklyWeatheerRecommendationRequest,
    TGetWeeklyWeatheerRecommendationResponse,
} from '@/types/home/weather';

import { axiosInstance } from '../axiosInstance';

// 주간 날씨 추천 조회 API
export const getWeeklyWeatherRecommendation = async ({
    regionId,
    startDate,
}: TGetWeeklyWeatheerRecommendationRequest): Promise<TGetWeeklyWeatheerRecommendationResponse> => {
    const { data } = await axiosInstance.get(`/api/v1/weather/${regionId}/weekly`, { params: { startDate: startDate } });
    return data;
};
export const getPrecipitation = async ({ regionId, startDate }: TGetPrecipitationRequest): Promise<TGetPrecipitationResponse> => {
    const { data } = await axiosInstance.get(`/api/v1/weather/${regionId}/precipitation`, { params: { startDate: startDate } });
    return data;
};
