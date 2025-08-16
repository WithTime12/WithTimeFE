import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import useGetBookmarkedCourse from '@/hooks/course/useGetBookmarkedCourse';
import { useUserGrade } from '@/hooks/home/useUserGrade';

import { MODAL_TYPES } from '@/components/common/modalProvider';
import Navigator from '@/components/common/navigator';
import DateCourse from '@/components/dateCourse/dateCourse';

import Filter from '@/assets/icons/filter_Blank.svg?react';
import useFilterStore from '@/store/useFilterStore';
import useModalStore from '@/store/useModalStore';

export default function Course() {
    const navigate = useNavigate();
    const { openModal } = useModalStore();
    const [current, setCurrent] = useState(1);

    const { budget, datePlaces, dateDurationTime, startTime, mealTypes, transportation, userPreferredKeywords } = useFilterStore();

    const { data, isLoading, error } = useGetBookmarkedCourse({
        page: current - 1,
        size: 5,
        budget,
        dateDurationTime,
        datePlaces,
        mealTypes,
        transportation,
        userPreferredKeywords,
        startTime,
        isBookmarked: true,
    });

    const { data: gradeData } = useUserGrade();

    if (error) {
        return <Navigate to="/error" replace={true} />;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex w-[1000px] max-w-[80vw] flex-col py-[24px] gap-[64px]">
                <div className="flex flex-col gap-[22px]">
                    <button
                        className="bg-primary-500 py-[20px] rounding-16 text-default-gray-100 font-heading3 select-none"
                        onClick={() => navigate('/makeCourse')}
                    >
                        AI 기반 데이트 코스 만들기
                    </button>
                    <button
                        className="bg-primary-500 py-[20px] rounding-16 text-default-gray-100 font-heading3 select-none"
                        onClick={() => navigate('/findCourse')}
                    >
                        직접 데이트 코스 찾아보기
                    </button>
                </div>
                <div className="flex flex-col shadow-default rounding-16 px-[10px] sm:px-[40px] py-[24px]">
                    <div className="flex w-full justify-between py-[24px] gap-[12px] lg:flex-row flex-col">
                        <div className="font-heading3 sm:w-fit w-full text-center justify-center select-none">
                            {gradeData?.result.username ?? '회원님의'} 님만의 데이트 코스
                        </div>
                        <div className="flex gap-[12px] justify-center items-center sm:justify-end flex-col sm:flex-row">
                            <div
                                className="hover:cursor-pointer select-none px-[16px] py-[8px] gap-[4px] text-body2 rounding-16 flex rounding-16 w-fit border-[1px] border-default-gray-700  text-default-gray-700"
                                onClick={() => openModal({ modalType: MODAL_TYPES.DateCourseSearchFilterModal })}
                            >
                                <Filter stroke="#616161" />
                                검색 필터
                            </div>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="w-full justify-center flex">
                            <ClipLoader />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-[24px] ">
                                {data?.result.dateCourseList.map((course, idx) => {
                                    return <DateCourse key={course.dateCourseId ?? idx} {...course} />;
                                })}
                            </div>
                            <Navigator current={current} end={data?.result.totalPages!} onClick={setCurrent} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
