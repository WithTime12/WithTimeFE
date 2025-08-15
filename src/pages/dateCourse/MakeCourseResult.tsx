import { useNavigate } from 'react-router-dom';

import { SigStorage } from '@/utils/appendSignature';

import { useCourse } from '@/hooks/course/useCourse';
import { useUserGrade } from '@/hooks/home/useUserGrade';

import DateCourse from '@/components/dateCourse/dateCourse';
import DateCourseLoading from '@/components/dateCourse/dateCourseLoading';

import Button from '../../components/common/Button';

import Reload from '@/assets/icons/arrow_spin.svg?react';
import Logo from '@/assets/withTimeLogo/logo_Blank.svg?react';
import useDateCourseResultStore from '@/store/useDateCourseResultStore';
import useFilterStore from '@/store/useFilterStore';

export default function MakeCourseResult() {
    const navigate = useNavigate();
    const { setAll, ...courseData } = useDateCourseResultStore();
    const { useMakeCourse } = useCourse();
    const { budget, datePlaces, dateDurationTime, mealTypes, transportation, userPreferredKeywords, startTime } = useFilterStore();
    const { mutate: makeCourseMutate, isPending } = useMakeCourse;
    const { data: gradeData } = useUserGrade();

    const handleSubmit = () => {
        makeCourseMutate(
            {
                budget: budget!,
                dateDurationTime: dateDurationTime!,
                datePlaces: datePlaces,
                mealTypes: mealTypes,
                transportation: transportation!,
                userPreferredKeywords,
                startTime: startTime!,
                excludedCourseSignatures: SigStorage.get(),
            },
            {
                onSuccess: (data) => {
                    SigStorage.append(data.result.signature);
                    setAll(data.result);
                    navigate('/makeCourse/result');
                },
                onError: () => {
                    navigate('/makeCourse');
                },
            },
        );
    };
    if (isPending) {
        return <DateCourseLoading />;
    }
    return (
        <div className="flex w-full justify-center items-center min-h-[66vh] p-[40px]">
            <div className="flex-col flex h-fit max-w-[95vw] w-[1000px] shadow-default rounding-16 px-[10px] sm:px-[40px] py-[24px] shadow-default">
                <div className="flex w-full justify-between items-center py-[24px] gap-[12px] lg:flex-row ">
                    <div className="font-heading3 flex-nowrap sm:w-fit w-full text-center justify-center">{gradeData?.result.username} 님만의 데이트 코스</div>
                    <Logo className="w-[41px] h-[36px] sm:flex hidden" />
                </div>
                <div className="flex flex-col gap-[24px] ">
                    {courseData.datePlaces && courseData.datePlaces?.length > 0 ? (
                        <DateCourse make={true} defaultOpen={true} {...courseData} />
                    ) : (
                        <div className="flex flex-col w-full gap-2 justify-center py-14 text-center font-heading3">
                            입력하신 조건을 만족하는 데이트 코스 제작에 실패하였습니다.
                            <br />
                            <span className="font-body1">다른 조건으로 재시도 해보세요</span>
                        </div>
                    )}
                </div>
                <Button size="big-16" variant="mint" className="flex mt-[40px] self-center px-[32px] items-center gap-[8px]">
                    <Reload />
                    <div className="flex flex-col items-center justify-center">
                        <div className="font-heading3 select-none" onClick={handleSubmit}>
                            다시 만들기
                        </div>
                    </div>
                </Button>
            </div>
        </div>
    );
}
