import MainCard from './mainCard';

import ArchiveBlank from '@/assets/icons/Archive_Blank.svg?react';

function DateCourseStore() {
    return (
        <MainCard>
            <div className="flex flex-col px-4 sm:px-8 lg:px-[20px] py-8 lg:py-[28px] h-full justify-center">
                <div className="flex items-start justify-start">
                    <ArchiveBlank className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 stroke-[#000000] mb-2" />
                </div>
                <div className="flex text-sm sm:text-base lg:text-m bold-medium text-[#616161] mb-1">내 데이트 코스를</div>
                <div className="flex gap-1 items-center">
                    <div className="text-lg sm:text-xl font-bold text-primary-700 whitespace-nowrap">2,345명</div>
                    <div className="text-sm sm:text-base lg:text-m bold-medium text-[#616161] whitespace-nowrap">이 저장했어요.</div>
                </div>
            </div>
        </MainCard>
    );
}
export default DateCourseStore;
