import type {
    TGetPrecipitationRequest,
    TGetPrecipitationResponse,
    TGetWeeklyWeatherRecommendationRequest,
    TGetWeeklyWeatherRecommendationResponse,
} from '@/types/home/weather';

import { axiosInstance } from '@/api/axiosInstance';

// 주간 날씨 추천 조회 API
export const getWeeklyWeatherRecommendation = async ({
    regionId,
    startDate,
}: TGetWeeklyWeatherRecommendationRequest): Promise<TGetWeeklyWeatherRecommendationResponse> => {
    const { data } = await axiosInstance.get(`/api/v1/weather/${regionId}/weekly`, { params: { startDate } });
    return data;
};

export const getPrecipitation = async ({ regionId, startDate }: TGetPrecipitationRequest): Promise<TGetPrecipitationResponse> => {
    const { data } = await axiosInstance.get(`/api/v1/weather/${regionId}/precipitation`, { params: { startDate } });
    return data;
};
