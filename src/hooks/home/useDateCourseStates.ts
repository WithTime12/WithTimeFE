import { useCoreQuery } from '@/hooks/customQuery';

import { getDateCourseSavedCount } from '@/api/home/dateCourse';
import { HomeKeys } from '@/queryKey/queryKey';

// 데이트 코스 저장 횟수 훅
export const useDateCourseSavedCount = () => {
    return useCoreQuery(HomeKeys.dateCourseSave().queryKey, getDateCourseSavedCount, {
        gcTime: 15 * 60 * 1000, // 15분
        retry: 3,
    });
};
