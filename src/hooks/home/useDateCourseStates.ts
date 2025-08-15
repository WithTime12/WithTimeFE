import { useCoreQuery } from '@/hooks/customQuery';

import { getDateCourseSavedCount } from '@/api/home/dateCourse';
import { homeKeys } from '@/queryKey/queryKey';

// 데이트 코스 저장 횟수 훅
export const useDateCourseSavedCount = () => {
    return useCoreQuery(homeKeys.dateCourseSave().queryKey, getDateCourseSavedCount, {
        gcTime: 15 * 60 * 1000, // 15분
        retry: 3,
    });
};
