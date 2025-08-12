import type { TGetDateTimeStates, TMonthlyDatePlaceResponse } from '../../types/home/datePlace';

import { axiosInstance } from '@/api/axiosInstance';

// 월별 데이트 장소 수 조회 API
export const getMonthlyDatePlaceStates = async (): Promise<TMonthlyDatePlaceResponse> => {
    const { data } = await axiosInstance.get('/api/v1/logs/dateplaces/monthly');
    return data;
};

export const getDateTimeStates = async (): Promise<TGetDateTimeStates> => {
    const { data } = await axiosInstance.get('/api/v1/logs/datecourses/average');
    return data;
};
