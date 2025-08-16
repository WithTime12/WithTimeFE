import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import useGetCourse from '@/hooks/course/useGetCourse';

import GraySvgButton from '@/components/common/graySvgButton';
import { MODAL_TYPES } from '@/components/common/modalProvider';
import Navigator from '@/components/common/navigator';
import DateCourse from '@/components/dateCourse/dateCourse';

import Filter from '@/assets/icons/filter_Blank.svg?react';
import useFilterStore from '@/store/useFilterStore';
import useModalStore from '@/store/useModalStore';

function FindDateCourse() {
    const { openModal } = useModalStore();
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();
    const { budget, datePlaces, dateDurationTime, startTime, mealTypes, transportation, userPreferredKeywords } = useFilterStore();
    useEffect(() => {
        setCurrent(1);
    }, [budget, datePlaces, dateDurationTime, startTime, mealTypes, transportation, userPreferredKeywords]);

    const { data, isLoading, error } = useGetCourse({
        page: current,
        size: 5,
        budget,
        dateDurationTime,
        datePlaces: datePlaces,
        mealTypes,
        transportation,
        userPreferredKeywords,
        startTime,
        isBookmarked: false,
    });

    if (error) {
        return <Navigate to="/error" replace={true} />;
    }

    return (
        <div className="w-full flex justify-center items-center flex-col h-fit">
            <div className="flex w-[1000px] max-w-[80vw] flex-col py-[24px] gap-[20px]">
                <div className="flex justify-start w-full">
                    <GraySvgButton type="backward" onClick={() => navigate('/dateCourse')} />
                </div>
                <div className="flex flex-col shadow-default rounding-16 px-[40px] py-[24px]">
                    <div className="flex w-full gap-[16px] flex-col items-center py-[24px] sm:flex-row sm:justify-between sm:items-center">
                        <div className="font-heading3 select-none flex">직접 데이트 코스 찾아보기</div>
                        <div
                            className="w-fit ml-auto px-[16px] flex-nowrap select-none py-[8px] rounding-16 flex rounding-16 border-[1px] border-default-gray-700 text-default-gray-700"
                            onClick={() => openModal({ modalType: MODAL_TYPES.DateCourseSearchFilterModal })}
                        >
                            <Filter stroke="#616161" />
                            검색 필터
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="w-full justify-center flex">
                            <ClipLoader />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-[24px] ">
                                {data?.result?.dateCourseList.map((course, idx) => {
                                    return <DateCourse key={course.dateCourseId ?? idx} {...course} />;
                                })}
                            </div>
                            <Navigator current={current + 1} end={data?.result?.totalPages!} onClick={setCurrent} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FindDateCourse;
