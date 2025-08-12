import { memo } from 'react';

import { useDateTimesStats } from '@/hooks/home/useDateTimes';

import MainCard from './mainCard';

function DateTimes() {
    const { data: stats, isLoading, error } = useDateTimesStats();

    // 기본 데이터 (API 에러 시 사용)

    // API 데이터 또는 기본 데이터 사용
    const displayStats = stats?.result;

    return (
        <MainCard>
            <div className="flex flex-row min-w-fit py-[28px] justify-center">
                {/* 첫 번째 카드 - WithTime 이용자 평균 데이트 횟수 */}
                <div className="flex flex-col items-center justify-center min-w-fit px-[30px] sm:px-[56px]">
                    <div className="text-sm text-default-gray-700 mb-1 flex">최근 1개월</div>
                    <div className="text-xs text-default-gray-500 mb-2 text-center flex flex-nowrap">
                        WithTime 이용자
                        <br />
                        평균 데이트 횟수
                    </div>
                    {isLoading ? (
                        <div className="text-3xl font-bold text-default-gray-800">로딩...</div>
                    ) : (
                        <div className="text-3xl font-bold text-default-gray-800">{displayStats?.averageDateCount}회</div>
                    )}
                </div>

                <div className="w-[1px] h-[149px] border-[0.5px] border-default-gray-400" />

                {/* 두 번째 카드 - 나의 데이트 횟수 */}
                <div className="flex flex-col items-center justify-center min-w-fit px-[30px] sm:px-[56px]">
                    <div className="text-sm text-default-gray-700 mb-1">최근 1개월</div>
                    <div className="text-xs text-default-gray-500 mb-5 text-center">나의 데이트 횟수</div>
                    {isLoading ? (
                        <div className="text-3xl font-bold text-primary-700">로딩...</div>
                    ) : (
                        <div className="text-3xl font-bold text-primary-700">{displayStats?.myDateCount}회</div>
                    )}
                </div>
            </div>

            {/* 에러 상태 표시 */}
            {error && <div className="text-center text-red-500 text-sm mt-2">데이터를 불러올 수 없습니다</div>}
        </MainCard>
    );
}

export default memo(DateTimes);
