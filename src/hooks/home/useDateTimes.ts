import { useQuery } from '@tanstack/react-query';

import { getMonthlyDatePlaceStats } from '../../api/home/datePlace';

// 데이트 횟수 통계 훅
export const useDateTimesStats = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['date-times-stats'],
        queryFn: getMonthlyDatePlaceStats,
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 15 * 60 * 1000, // 15분
        retry: 3,
    });

    // 월별 데이터를 통계로 변환
    const stats = {
        totalPlaces: 0,
        averageDateTimes: 0,
        monthlyGrowth: 0,
    };

    if (data?.result?.datePlaceLogList) {
        const monthlyData = data.result.datePlaceLogList;

        // 최근 3개월 데이터로 평균 계산
        const recentMonths = monthlyData.slice(-3);

        if (recentMonths.length > 0) {
            // 총 장소 수 (최근 3개월 합계)
            stats.totalPlaces = recentMonths.reduce((sum, month) => sum + month.count, 0);

            // 월 평균 데이트 횟수
            stats.averageDateTimes = Math.round((stats.totalPlaces / recentMonths.length) * 10) / 10;

            // 월별 성장률 (최근 2개월 비교)
            if (recentMonths.length >= 2) {
                const currentMonth = recentMonths[recentMonths.length - 1].count;
                const previousMonth = recentMonths[recentMonths.length - 2].count;
                stats.monthlyGrowth = previousMonth > 0 ? Math.round(((currentMonth - previousMonth) / previousMonth) * 100 * 10) / 10 : 0;
            }
        }
    }

    return { stats, isLoading, error };
};
