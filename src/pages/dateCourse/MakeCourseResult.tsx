import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TPostDateCourseResponse } from '@/types/dateCourse/dateCourse';

import { toKSTISOString } from '@/utils/timeZoneChange';

import { useCourse } from '@/hooks/course/useCourse';

import DateCourse from '@/components/dateCourse/dateCourse';
import DateCourseLoading from '@/components/dateCourse/dateCourseLoading';

import Button from '../../components/common/Button';

import Reload from '@/assets/icons/arrow_spin.svg?react';
import Logo from '@/assets/withTimeLogo//logo_Blank.svg?react';
import useFilterStore from '@/store/useFilterStore';

export default function MakeCourseResult() {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState<TPostDateCourseResponse>();
    const { useMakeCourse } = useCourse();
    const { budget, datePlaces, dateDurationTime, startTime, mealTypes, transportation, userPreferredKeywords } = useFilterStore();
    const { mutate: makeCourseMutate, isPending } = useMakeCourse;

    useEffect(() => {
        const date = new Date(startTime!);
        makeCourseMutate(
            {
                budget: budget!,
                dateDurationTime: dateDurationTime!,
                // datePlaces: datePlaces,
                datePlaces: ['서울 종로구 인사동'],
                mealPlan: mealTypes,
                transportation: transportation!,
                userPreferredKeywords,
                startTime: toKSTISOString(date),
                excludedCourseSignatures: [],
            },
            {
                onSuccess: (data) => {
                    setCourseData(data);
                },
                onError: () => {
                    navigate('/makeCourse');
                },
            },
        );
    }, []);

    if (isPending) {
        return <DateCourseLoading />;
    }

    return (
        <div className="flex w-full justify-center items-center min-h-[66vh] p-[40px]">
            <div className="flex-col flex h-fit max-w-[95vw] w-[1000px] shadow-default rounding-16 px-[10px] sm:px-[40px] py-[24px] shadow-default">
                <div className="flex w-full justify-between items-center py-[24px] gap-[12px] lg:flex-row ">
                    <div className="font-heading3 flex-nowrap sm:w-fit w-full text-center justify-center">Madeleine 님만의 데이트 코스</div>
                    <Logo className="w-[41px] h-[36px] sm:flex hidden" />
                </div>
                <div className="flex flex-col gap-[24px] ">
                    {courseData?.result?.datePlaces && courseData?.result?.datePlaces?.length > 0 ? (
                        <DateCourse make={true} defaultOpen={true} {...courseData?.result} />
                    ) : (
                        <div />
                    )}
                </div>
                <Button size="big-16" variant="mint" className="flex mt-[40px] self-center px-[32px] items-center gap-[8px]">
                    <Reload />
                    <div className="flex flex-col items-center justify-center">
                        <div className="font-heading3 select-none" onClick={() => navigate('/makeCourse')}>
                            다시 만들기
                        </div>
                    </div>
                </Button>
            </div>
        </div>
    );
}
