import { useQuery } from '@tanstack/react-query';

import { getUserGrade } from '../../api/home/level';

// 사용자 등급 정보 훅
export const useUserGrade = () => {
    return useQuery({
        queryKey: ['user-grade'],
        queryFn: getUserGrade,
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 15 * 60 * 1000, // 15분
        retry: 3,
    });
};
