import { useEffect, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import type { IQuestion } from '@/types/dateCourse/dateCourse';
import { DateCourseQuestion } from '@/constants/dateCourseQuestion';

import {
    BudgetTimeValidation,
    DateTimeStartValidation,
    KeywordGroupOverValidation,
    KeywordMealValidation,
    MealTimeValidation,
    TotalTimeMealValidation,
} from '@/utils/dateCourseValidation';

import useGetBookmarkedCourse from '@/hooks/course/useGetBookmarkedCourse';
import useGetCourse from '@/hooks/course/useGetCourse';

import Button from '../common/Button';
import Modal from '../common/modal';
import DateCourseSearchFilterOption from '../dateCourse/dateCourseSearchFilterOption';

import useFilterStore from '@/store/useFilterStore';

type TProps = { onClose: () => void };

function computeErrors(f: { budget: any; dateDurationTime: any; mealTypes?: any[]; userPreferredKeywords?: any[]; startTime: any }): string[] {
    const e: string[] = Array(7).fill('');

    e[0] =
        BudgetTimeValidation({
            budget: f.budget,
            totalTime: f.dateDurationTime,
        }) || '';

    e[2] =
        TotalTimeMealValidation({
            totalTime: f.dateDurationTime,
            meal: f.mealTypes ?? [],
        }) || '';

    e[3] =
        KeywordMealValidation({
            meal: f.mealTypes ?? [],
            keywords: f.userPreferredKeywords ?? [],
        }) || '';

    e[5] =
        KeywordGroupOverValidation({
            keywords: f.userPreferredKeywords ?? [],
        }) || '';

    e[6] =
        MealTimeValidation({
            meal: f.mealTypes ?? [],
            time: f.startTime,
            totalTime: f.dateDurationTime,
        }) ||
        DateTimeStartValidation({
            time: f.startTime,
            totalTime: f.dateDurationTime,
        }) ||
        '';

    return e;
}
const TOTAL_QUESTIONS = 8;
const Questions: IQuestion[] = Array.isArray(DateCourseQuestion)
    ? DateCourseQuestion.slice(0, TOTAL_QUESTIONS - 1).map((q) => ({
          ...q,
          type: q.type as IQuestion['type'],
      }))
    : [];

export default function DateCourseSearchFilterModal({ onClose }: TProps) {
    const location = useLocation();
    const isBookmarked = location.pathname === '/bookmarkedCourse';

    const { budget, datePlaces, dateDurationTime, startTime, mealTypes, transportation, userPreferredKeywords, setField } = useFilterStore();
    useEffect(() => {
        if (!startTime) {
            const now = new Date();
            const defaultDate = now.toISOString().slice(0, 10);
            const defaultTime = now.toTimeString().slice(0, 5);
            setField('startTime', `${defaultDate}T${defaultTime}`);
        }
    }, [startTime, setField]);

    const commonParams = {
        budget,
        datePlaces,
        dateDurationTime,
        startTime,
        mealTypes,
        transportation,
        userPreferredKeywords,
        size: 5,
        page: 0,
        isBookmarked,
    };

    const { data: courseData, isLoading: courseDataLoading, error: courseDataError } = useGetCourse(commonParams);
    const { data: bookmarkedData, isLoading: bookmarkDataLoading, error: bookmarkDataError } = useGetBookmarkedCourse(commonParams);

    const data = isBookmarked ? bookmarkedData : courseData;

    const stepFieldMap = {
        0: 'budget',
        1: 'datePlaces',
        2: 'dateDurationTime',
        3: 'mealTypes',
        4: 'transportation',
        5: 'userPreferredKeywords',
        6: 'startTime',
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
        const step = idx; // ★ 중요
        const fieldName = stepFieldMap[step as keyof typeof stepFieldMap];
        return fieldName ? fieldValues[fieldName] : null;
    };

    const updateByStep = (idx: number, v: any) => {
        const step = idx; // ★ 중요
        const fieldName = stepFieldMap[step as keyof typeof stepFieldMap];
        if (!fieldName) return;

        if ([1, 3, 5].includes(step) && !Array.isArray(v)) {
            v = [];
        }
        setField(fieldName, v ?? null);
    };

    const errorMessages = useMemo(
        () =>
            computeErrors({
                budget,
                dateDurationTime,
                mealTypes,
                userPreferredKeywords,
                startTime,
            }),
        [budget, dateDurationTime, mealTypes, userPreferredKeywords, startTime],
    );

    if (bookmarkDataError || courseDataError) {
        return <Navigate to="/error" replace={true} />;
    }

    return (
        <Modal onClose={onClose} title="검색 필터">
            <div className="flex flex-col w-full max-w-[80vw] px-[8%] gap-10 py-10">
                {Questions.map((q, idx) => (
                    <DateCourseSearchFilterOption
                        key={q.id}
                        title={q.title}
                        subTitle={q.subTitle}
                        options={q.options}
                        value={valueByStep(idx)}
                        onChange={(v) => updateByStep(idx, v)}
                        type={q.type}
                        apiRequestValue={q.apiRequestValue}
                        errorMessage={errorMessages[idx] ?? ''}
                        autoInit={q.type === 'time' && idx === 7}
                    />
                ))}

                <div className="flex w-full justify-end">
                    {bookmarkDataLoading || courseDataLoading ? (
                        <ClipLoader />
                    ) : (
                        <Button size="big-16" variant="mint" className="w-fit text-center px-[30px] font-body1" onClick={onClose}>
                            데이트 코스 {data?.result.totalCount ?? 0}개 보기
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}
