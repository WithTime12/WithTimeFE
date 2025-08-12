import type { IWeeklyKeywordResponse } from '../../types/home/keyword';
import { axiosInstance } from '../axiosInstance';

// 이번 주 인기 키워드 조회 API
export const getWeeklyKeywords = async (): Promise<IWeeklyKeywordResponse> => {
    try {
        const response = await axiosInstance.get('/api/v1/logs/keyword/weekly');
        return response.data;
    } catch {
        throw new Error('이번 주 인기 키워드를 가져오는데 실패했습니다.');
    }
};
