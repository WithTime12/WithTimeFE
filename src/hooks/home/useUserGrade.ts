import { useCoreQuery } from '@/hooks/customQuery';

import { getUserGrade } from '@/api/home/level';
import { HomeKeys } from '@/queryKey/queryKey';

// 사용자 등급 정보 훅
export const useUserGrade = () => {
    return useCoreQuery(HomeKeys.getUserGrade().queryKey, () => getUserGrade(), {
        gcTime: 15 * 60 * 1000, // 15분
        retry: 3,
    });
};
