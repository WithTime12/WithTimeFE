import { useState } from 'react';

import useGetBookmarkedCourse from '@/hooks/course/useGetBookmarkedCourse';

import { MODAL_TYPES } from '@/components/common/modalProvider';
import Navigator from '@/components/common/navigator';
import DateCourse from '@/components/dateCourse/dateCourse';

import Filter from '@/assets/icons/filter_Blank.svg?react';
import useFilterStore from '@/store/useFilterStore';
import useModalStore from '@/store/useModalStore';

function BookmarkedDateCourse() {
    const [current, setCurrent] = useState(1);

    const { openModal } = useModalStore();

    const { budget, datePlaces, dateDurationTime, startTime, mealTypes, transportation, userPreferredKeywords } = useFilterStore();
    const { data } = useGetBookmarkedCourse({
        page: current,
        size: 5,
        budget,
        dateDurationTime,
        datePlaces,
        mealTypes,
        transportation,
        userPreferredKeywords,
        startTime,
    });

    return (
        <div className="w-full flex justify-center items-center flex-col h-fit">
            <div className="flex w-[1000px] max-w-[80vw] flex-col py-[24px] gap-[64px]">
                <div className="flex flex-col shadow-default rounding-16 px-[40px] py-[24px]">
                    <div className="flex w-full gap-[16px] flex-col items-center py-[24px] sm:flex-row sm:justify-between sm:items-center">
                        <div className="font-heading3 select-none flex">저장된 데이트 코스</div>
                        <div
                            onClick={() => openModal({ modalType: MODAL_TYPES.DateCourseSearchFilterModal })}
                            className="w-fit ml-auto px-[16px] flex-nowrap select-none py-[8px] rounding-16 flex rounding-16 border-[1px] border-default-gray-700 text-default-gray-700"
                        >
                            <Filter stroke="#616161" />
                            검색 필터
                        </div>
                    </div>
                    <div className="flex flex-col gap-[24px] ">
                        {data?.result.dateCourseList.map((course) => {
                            return <DateCourse defaultOpen={false} key={course.dateCourseId} {...course} />;
                        })}
                    </div>
                    <Navigator current={current} end={data?.result.totalPages ?? 5} onClick={setCurrent} />
                </div>
            </div>
        </div>
    );
}

export default BookmarkedDateCourse;
