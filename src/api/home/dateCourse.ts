import type { TDateCourseSavedCountResponse } from '@/types/home/dateCourse';

import { axiosInstance } from '@/api/axiosInstance';

export const getDateCourseSavedCount = async (): Promise<TDateCourseSavedCountResponse> => {
    const { data } = await axiosInstance.get('/api/v1/logs/datecourses/saved-count');
    return data;
};
