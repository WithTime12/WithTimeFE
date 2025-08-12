import type { IUserGradeResponse } from '../../types/home/level';
import { axiosInstance } from '../axiosInstance';

// 사용자 등급 조회 API
export const getUserGrade = async (): Promise<IUserGradeResponse> => {
    try {
        const response = await axiosInstance.get('/api/v1/members/grade');
        return response.data;
    } catch {
        throw new Error('사용자 등급 정보를 가져오는데 실패했습니다.');
    }
};
