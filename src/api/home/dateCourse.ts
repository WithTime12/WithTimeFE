import type { IDateCourseSavedCountResponse } from '../../types/home/dateCourse';
import { axiosInstance } from '../axiosInstance';

// 데이트 코스 저장 횟수 조회 API
export const getDateCourseSavedCount = async (): Promise<IDateCourseSavedCountResponse> => {
    try {
        const response = await axiosInstance.get('/api/v1/logs/datecourses/saved-count');
        return response.data;
    } catch {
        throw new Error('데이트 코스 저장 횟수를 가져오는데 실패했습니다.');
    }
};
