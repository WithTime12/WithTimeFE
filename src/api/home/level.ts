import type { TUserGradeResponse } from '@/types/home/level';

import { axiosInstance } from '@/api/axiosInstance';

// 사용자 등급 조회 API
export const getUserGrade = async (): Promise<TUserGradeResponse> => {
    const { data } = await axiosInstance.get('/api/v1/members/grade');
    return data;
};
