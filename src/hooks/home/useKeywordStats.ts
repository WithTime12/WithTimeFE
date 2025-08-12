import { useQuery } from '@tanstack/react-query';

import { getWeeklyKeywords } from '../../api/home/keyword';

// 이번 주 인기 키워드 훅
export const useWeeklyKeywords = () => {
    return useQuery({
        queryKey: ['keywords', 'weekly'],
        queryFn: getWeeklyKeywords,
        staleTime: 10 * 60 * 1000, // 10분
        gcTime: 30 * 60 * 1000, // 30분
        retry: 3,
    });
};
