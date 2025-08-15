// MakeCourseStep.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { IQuestion } from '@/types/dateCourse/dateCourse';
import { DateCourseQuestion } from '@/constants/dateCourseQuestion';

import { SigStorage } from '@/utils/appendSignature';
import {
    BudgetTimeValidation,
    DateTimeStartValidation,
    KeywordGroupOverValidation,
    KeywordMealValidation,
    MealTimeValidation,
    TotalTimeMealValidation,
} from '@/utils/dateCourseValidation';

import { useCourse } from '@/hooks/course/useCourse';

import Button from '@/components/common/Button';
import GraySvgButton from '@/components/common/graySvgButton';
import DateCourseLoading from '@/components/dateCourse/dateCourseLoading';
import DateCourseSearchFilterOption from '@/components/dateCourse/dateCourseSearchFilterOption';

import useDateCourseResultStore from '@/store/useDateCourseResultStore';
import useFilterStore from '@/store/useFilterStore';

const TOTAL_QUESTIONS = 8;

// 7개 문항(1~7)만 사용, 8은 결과 화면으로 가정
const Questions: IQuestion[] = Array.isArray(DateCourseQuestion)
    ? DateCourseQuestion.slice(0, TOTAL_QUESTIONS - 1).map((q) => ({
          ...q,
          type: q.type as IQuestion['type'],
      }))
    : [];

function ProgressBar({ step, total }: { step: number; total: number }) {
    const percentage = (step / total) * 100;
    return (
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${percentage}%` }} />
        </div>
    );
}

export default function MakeCourseStep() {
    const { step } = useParams<{ step: string }>();
    const navigate = useNavigate();
    const { budget, datePlaces, dateDurationTime, mealTypes, transportation, userPreferredKeywords, startTime, setField } = useFilterStore();

    const [errorMessage, setErrorMessage] = useState<string>('');
    const { useMakeCourse } = useCourse();
    const { mutate: makeCourseMutate, isPending } = useMakeCourse;
    const currentStep = Number(step);
    const question = Questions[currentStep - 1];
    const { setAll } = useDateCourseResultStore();

    const handlePrev = () => {
        if (currentStep > 1) navigate(`/makeCourse/${currentStep - 1}`);
        else navigate('/makeCourse');
    };

    const stepFieldMap = {
        1: 'budget',
        2: 'datePlaces',
        3: 'dateDurationTime',
        4: 'mealTypes',
        5: 'transportation',
        6: 'userPreferredKeywords',
        7: 'startTime',
    } as const;

    const fieldValues = {
        budget,
        datePlaces,
        dateDurationTime,
        mealTypes,
        transportation,
        userPreferredKeywords,
        startTime,
    };

    const valueByStep = (idx: number): string | string[] | null => {
        const fieldName = stepFieldMap[idx as keyof typeof stepFieldMap];
        return fieldName ? fieldValues[fieldName] : null;
    };

    const updateByStep = (idx: number, v: any) => {
        const fieldName = stepFieldMap[idx as keyof typeof stepFieldMap];
        if (!fieldName) return;

        // 배열 필드 처리
        if ([2, 4, 6].includes(idx) && !Array.isArray(v)) {
            v = [];
        }
        setField(fieldName, v ?? null);
    };

    const currentAnswer = valueByStep(currentStep);

    const isDisabled =
        currentStep !== 4 &&
        (currentAnswer === null ||
            (Array.isArray(currentAnswer) && currentAnswer.length === 0) ||
            (typeof currentAnswer === 'string' && currentAnswer.trim().length === 0));

    const handleNext = () => {
        if (currentStep === 4) {
            navigate(`/makeCourse/${currentStep + 1}`);
            return;
        }

        if (isDisabled) return;

        if (currentStep < TOTAL_QUESTIONS - 1) {
            navigate(`/makeCourse/${currentStep + 1}`);
        }
    };

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
                    setAll(data.result);
                    navigate('/makeCourse/result');
                },
                onError: () => {
                    navigate('/makeCourse');
                },
            },
        );
    };

    useEffect(() => {
        if (!step) navigate('/makeCourse/1', { replace: true });
    }, []);

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0 });
        document.body.scrollTo({ top: 0 });
    }, [currentStep, errorMessage]);

    useEffect(() => {
        let msg = '';
        if (currentStep === 3) {
            msg = BudgetTimeValidation({ budget: budget as any, totalTime: dateDurationTime as any }) || '';
        }
        if (currentStep === 4) {
            msg = TotalTimeMealValidation({ totalTime: dateDurationTime as any, meal: mealTypes ?? [] }) || '';
        }
        if (currentStep === 6) {
            msg =
                KeywordMealValidation({ meal: mealTypes ?? [], keywords: userPreferredKeywords ?? [] }) ||
                KeywordGroupOverValidation({ keywords: userPreferredKeywords ?? [] }) ||
                '';
        }
        if (currentStep === 7) {
            msg =
                MealTimeValidation({ meal: mealTypes ?? [], time: startTime as any, totalTime: dateDurationTime as any }) ||
                DateTimeStartValidation({ time: startTime as any, totalTime: dateDurationTime as any }) ||
                '';
        }
        setErrorMessage(msg);
    }, [currentStep, budget, dateDurationTime, mealTypes, userPreferredKeywords, startTime]);

    if (!question) return <div>질문을 불러올 수 없습니다.</div>;
    if (isPending) {
        return <DateCourseLoading />;
    }

    return (
        <div className="flex flex-col px-6 max-w-[90vw] w-[1000px] mx-auto pt-[50px] pb-[150px] gap-[10px] min-h-[90vh] h-fit">
            <div className="w-full">
                <GraySvgButton type="backward" onClick={handlePrev} />
            </div>

            <div className="flex flex-col w-full mb:px-[50px] gap-[20px]">
                <div className="w-full mb-8">
                    <ProgressBar step={currentStep} total={TOTAL_QUESTIONS} />
                </div>

                <div className="text-left w-full text-sm text-gray-500">
                    {currentStep} / {TOTAL_QUESTIONS}
                </div>

                <DateCourseSearchFilterOption
                    title={question.title}
                    type={question.type}
                    subTitle={question.subTitle}
                    options={question.options}
                    value={valueByStep(currentStep)}
                    onChange={(v) => updateByStep(currentStep, v)}
                    errorMessage={errorMessage}
                    apiRequestValue={question.apiRequestValue}
                    autoInit={question.type === 'time' && currentStep === 7}
                />

                <div className="mt-[120px] flex w-full items-center justify-center">
                    {currentStep === TOTAL_QUESTIONS - 1 ? (
                        <Button className="w-fit px-[100px] items-center self-center" onClick={handleSubmit} variant="mint" size="big-16" disabled={isDisabled}>
                            결과보기
                        </Button>
                    ) : (
                        <Button className="w-fit px-[100px] items-center self-center" onClick={handleNext} variant="mint" size="big-16" disabled={isDisabled}>
                            다음
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
