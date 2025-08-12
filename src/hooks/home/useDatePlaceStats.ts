import { useQuery } from '@tanstack/react-query';

import { getMonthlyDatePlaceStats } from '../../api/home/datePlace';
import type { IYearlyPlaceStats } from '../../types/home/datePlace';

// 월별 데이터를 연도별로 변환하는 유틸리티 훅
export const useYearlyPlaceStats = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['monthly-date-place-stats'],
        queryFn: getMonthlyDatePlaceStats,
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 15 * 60 * 1000, // 15분
        retry: 3,
    });

    const yearlyStats: IYearlyPlaceStats[] = [];

    if (data?.result?.datePlaceLogList) {
        // 월별 데이터를 연도별로 그룹화
        const yearlyMap = new Map<number, number>();

        data.result.datePlaceLogList.forEach((log) => {
            const year = log.year;
            yearlyMap.set(year, (yearlyMap.get(year) || 0) + log.count);
        });

        // 연도별 통계 생성
        yearlyMap.forEach((placeCount, year) => {
            yearlyStats.push({ year, placeCount });
        });

        // 연도순으로 정렬
        yearlyStats.sort((a, b) => a.year - b.year);
    }

    return { yearlyStats, isLoading, error };
};
