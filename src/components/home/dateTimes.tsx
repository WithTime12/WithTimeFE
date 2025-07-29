import MainCard from './mainCard';

import ArchiveBlank from '@/assets/icons/Archive_Blank.svg?react';

function DateTimes() {
    return (
        <MainCard>
            <div className="flex flex-col px-[56px] py-[28px] h-full justify-center">
                <div className="flex items-start justify-start">
                    <ArchiveBlank className="w-8 h-8 stroke-[#000000] mb-2" />
                </div>
                <div className="flex text-m bold-medium text-[#616161] mb-1">내 데이트 코스를</div>
                <div className="flex items-center gap-1">
                    <div className="text-xl font-bold text-primary-700">2,345명</div>
                    <div className="text-m bold-medium text-[#616161]">이 저장했어요.</div>
                </div>
            </div>
        </MainCard>
    );
}
export default DateTimes;
