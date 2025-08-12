import { getWeeklyKeywords } from '../../api/home/keyword';
import { useCoreQuery } from '../customQuery';

import { HomeKeys } from '@/queryKey/queryKey';

// 이번 주 인기 키워드 훅
export const useWeeklyKeywords = () => {
    return useCoreQuery(HomeKeys.keywords().queryKey, getWeeklyKeywords, {
        gcTime: 30 * 60 * 1000,
        retry: 3,
    });
};
