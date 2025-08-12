import { useQuery } from '@tanstack/react-query';

import { getDateCourseSavedCount } from '../../api/home/dateCourse';

// 데이트 코스 저장 횟수 훅
export const useDateCourseSavedCount = () => {
    return useQuery({
        queryKey: ['date-courses', 'saved-count'],
        queryFn: getDateCourseSavedCount,
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 15 * 60 * 1000, // 15분
        retry: 3,
    });
};
