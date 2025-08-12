import type { TGetDateTimeStats, TMonthlyDatePlaceResponse } from '../../types/home/datePlace';
import { axiosInstance } from '../axiosInstance';

// 월별 데이트 장소 수 조회 API
export const getMonthlyDatePlaceStats = async (): Promise<TMonthlyDatePlaceResponse> => {
    try {
        const response = await axiosInstance.get('/api/v1/logs/dateplaces/monthly');
        return response.data;
    } catch {
        throw new Error('월별 데이트 장소 통계를 가져오는데 실패했습니다.');
    }
};

export const getDateTimeStats = async (): Promise<TGetDateTimeStats> => {
    const { data } = await axiosInstance.get('/api/v1/logs/datecourses/average');
    return data;
};
