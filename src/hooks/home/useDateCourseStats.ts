import { getDateCourseSavedCount } from '../../api/home/dateCourse';
import { useCoreQuery } from '../customQuery';

import { HomeKeys } from '@/queryKey/queryKey';

// 데이트 코스 저장 횟수 훅
export const useDateCourseSavedCount = () => {
    return useCoreQuery(HomeKeys.dateCourseSave().queryKey, () => getDateCourseSavedCount(), {
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 15 * 60 * 1000, // 15분
        retry: 3,
    });
};
