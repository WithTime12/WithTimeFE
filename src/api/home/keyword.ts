import type { TWeeklyKeywordResponse } from '../../types/home/keyword';
import { axiosInstance } from '../axiosInstance';

// 이번 주 인기 키워드 조회 API
export const getWeeklyKeywords = async (): Promise<TWeeklyKeywordResponse> => {
    const { data } = await axiosInstance.get('/api/v1/logs/keyword/weekly');
    return data;
};
