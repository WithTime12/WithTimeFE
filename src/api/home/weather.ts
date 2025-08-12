import { axiosInstance } from '../axiosInstance';

// 주간 날씨 추천 조회 API
export const getWeeklyWeatherRecommendation = async (startDate: string) => {
    try {
        // 임시로 하드코딩된 지역 ID 사용 (서울)
        const regionId = 1;
        const response = await axiosInstance.get(`/api/v1/weather/${regionId}/weekly?startDate=${startDate}`);
        return response.data;
    } catch {
        throw new Error('주간 날씨 정보를 가져오는데 실패했습니다.');
    }
};
