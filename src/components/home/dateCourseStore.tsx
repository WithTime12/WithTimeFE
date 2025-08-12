import { useDateCourseSavedCount } from '@/hooks/home/useDateCourseStats';

import MainCard from './mainCard';

import ArchiveBlank from '@/assets/icons/Archive_Blank.svg?react';

function DateCourseStore() {
    const { data, isLoading, error } = useDateCourseSavedCount();

    // 디버깅 로그 추가 (콘솔에만 출력)
    console.log('DateCourseStore - data:', data);
    console.log('DateCourseStore - isLoading:', isLoading);
    console.log('DateCourseStore - error:', error);

    // 기본 데이터 (API 에러 시 사용)
    const defaultCount = 2345;

    // API 데이터 또는 기본 데이터 사용
    const savedCount = data?.result?.count ?? defaultCount;

    console.log('DateCourseStore - savedCount:', savedCount);
    console.log('DateCourseStore - data?.result?.count:', data?.result?.count);

    return (
        <MainCard>
            <div className="flex flex-col px-4 sm:px-8 lg:px-[20px] py-8 lg:py-[28px] h-full justify-center">
                <div className="flex items-start justify-start">
                    <ArchiveBlank className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 stroke-[#000000] mb-2" />
                </div>
                <div className="flex text-sm sm:text-base lg:text-m bold-medium text-[#616161] mb-1">내 데이트 코스를</div>
                <div className="flex gap-1 items-center">
                    {isLoading ? (
                        <div className="text-lg sm:text-xl font-bold text-primary-700 whitespace-nowrap">로딩...</div>
                    ) : (
                        <div className="text-lg sm:text-xl font-bold text-primary-700 whitespace-nowrap">{savedCount.toLocaleString()}명</div>
                    )}
                    <div className="text-sm sm:text-base lg:text-m bold-medium text-[#616161] whitespace-nowrap">이 저장했어요.</div>
                </div>

                {/* 에러 상태 표시 */}
                {error && <div className="text-center text-red-500 text-sm mt-2">에러: {error.message}</div>}
            </div>
        </MainCard>
    );
}

export default DateCourseStore;
