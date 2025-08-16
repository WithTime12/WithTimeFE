import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

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

export default function DateCourseSearchFilterModal({ onClose }: TProps) {
    const location = useLocation();
    const isBookmarked = location.pathname === '/bookmarkedCourse';

    const { budget, datePlaces, dateDurationTime, startTime, mealTypes, transportation, userPreferredKeywords, setField } = useFilterStore();

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

    const Questions = useMemo(
        () =>
            (Array.isArray(DateCourseQuestion) ? DateCourseQuestion.slice(0, 7) : [])
                .map((q) => ({
                    ...q,
                    type: q.type as 'choice' | 'search' | 'time' | 'choices' | 'keyword',
                }))
                .filter((q) => q.filterTitle !== ''),
        [],
    );

    const valueByIndex = (idx: number) => {
        switch (idx) {
            case 0:
                return budget;
            case 1:
                return datePlaces;
            case 2:
                return dateDurationTime;
            case 3:
                return mealTypes;
            case 4:
                return transportation;
            case 5:
                return startTime;
            case 6:
                return userPreferredKeywords;
            default:
                return null;
        }
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

    const updateByIndex = (idx: number, raw: any) => {
        let v = raw;
        if ([1, 3, 6].includes(idx) && !Array.isArray(v)) v = [];

        switch (idx) {
            case 0:
                setField('budget', v ?? null);
                break;
            case 1:
                setField('datePlaces', v);
                break;
            case 2:
                setField('dateDurationTime', v ?? null);
                break;
            case 3:
                setField('mealTypes', v);
                break;
            case 4:
                setField('transportation', v ?? null);
                break;
            case 5:
                setField('startTime', v ?? null);
                break;
            case 6:
                setField('userPreferredKeywords', v);
                break;
        }
    };

    if (bookmarkDataError || courseDataError) {
        return <Navigate to="/error" replace={true} />;
    }

    return (
        <Modal onClose={onClose} title="검색 필터">
            <div className="flex flex-col w-full max-w-[80vw] px-[8%] gap-10 py-10">
                {Questions.map((q, idx) => (
                    <DateCourseSearchFilterOption
                        key={q.id}
                        title={q.filterTitle}
                        subTitle={q.subTitle}
                        options={q.options}
                        value={valueByIndex(idx)}
                        onChange={(v) => updateByIndex(idx, v)}
                        type={q.type}
                        apiRequestValue={q.apiRequestValue}
                        errorMessage={errorMessages[idx] ?? ''}
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
