// DateCourseSearchFilterModal.tsx
import { useMemo, useState } from 'react';

import { DateCourseQuestion } from '@/constants/dateCourseQuestion';

import {
    BudgetTimeValidation,
    DateTimeStartValidation,
    KeywordGroupOverValidation,
    KeywordMealValidation,
    MealTimeValidation,
    TotalTimeMealValidation,
} from '@/utils/dateCourseValidation';

import useGetCourse from '@/hooks/course/useGetCourse';

import Button from '../common/Button';
import Modal from '../common/modal';
import DateCourseSearchFilterOption from '../dateCourse/dateCourseSearchFilterOption';

import useFilterStore from '@/store/useFilterStore';

type TProps = { onClose: () => void };

export default function DateCourseSearchFilterModal({ onClose }: TProps) {
    const { setField, ...filters } = useFilterStore();
    const [errorMessages, setErrorMessages] = useState<string[]>(Array(7).fill(''));

    const { budget, datePlaces, dateDurationTime, startTime, mealTypes, transportation, userPreferredKeywords } = useFilterStore();
    const { data } = useGetCourse({
        budget,
        datePlaces,
        dateDurationTime,
        startTime,
        mealTypes,
        transportation,
        userPreferredKeywords,
        size: 5,
        page: 1,
    });
    const Questions = useMemo(
        () =>
            (Array.isArray(DateCourseQuestion) ? DateCourseQuestion.slice(0, 7) : [])
                .map((q) => ({ ...q, type: q.type as 'choice' | 'search' | 'time' | 'choices' | 'keyword' }))
                .filter((q) => q.filterTitle !== ''),
        [],
    );

    const valueByIndex = (idx: number) => {
        switch (idx) {
            case 0:
                return filters.budget;
            case 1:
                return filters.datePlaces;
            case 2:
                return filters.dateDurationTime;
            case 3:
                return filters.mealTypes;
            case 4:
                return filters.transportation;
            case 5:
                return filters.userPreferredKeywords;
            case 6:
                return filters.startTime;
            default:
                return null;
        }
    };

    const runValidation = () => {
        const errs = [...errorMessages];
        errs[0] = BudgetTimeValidation({ budget: filters.budget as any, totalTime: filters.dateDurationTime as any }) || '';
        errs[2] = TotalTimeMealValidation({ totalTime: filters.dateDurationTime as any, meal: filters.mealTypes ?? [] }) || '';
        errs[3] = KeywordMealValidation({ meal: filters.mealTypes ?? [], keywords: filters.userPreferredKeywords ?? [] }) || '';
        errs[5] = KeywordGroupOverValidation({ keywords: filters.userPreferredKeywords ?? [] }) || '';
        errs[6] =
            MealTimeValidation({ meal: filters.mealTypes ?? [], time: filters.startTime as any, totalTime: filters.dateDurationTime as any }) ||
            DateTimeStartValidation({ time: filters.startTime as any, totalTime: filters.dateDurationTime as any }) ||
            '';
        setErrorMessages(errs);
        return errs.every((e) => !e);
    };

    const updateByIndex = (idx: number, v: any) => {
        const apply = () => {
            switch (idx) {
                case 0:
                    setField('budget', v ?? null);
                    break;
                case 1:
                    setField('datePlaces', Array.isArray(v) ? v : []);
                    break;
                case 2:
                    setField('dateDurationTime', v ?? null);
                    break;
                case 3:
                    setField('mealTypes', Array.isArray(v) ? v : []);
                    break;
                case 4:
                    setField('transportation', v ?? null);
                    break;
                case 5:
                    setField('userPreferredKeywords', Array.isArray(v) ? v : []);
                    break;
                case 6:
                    setField('startTime', v ?? null);
                    break;
            }
        };

        apply();
        runValidation();
    };
    const number = 1234;
    return (
        <Modal onClose={onClose} title="검색 필터">
            <div className="flex flex-col w-full max-w-[80vw] px-[10%] gap-10 py-10">
                {Questions.map((q, idx) => (
                    <DateCourseSearchFilterOption
                        key={q.id}
                        title={q.filterTitle}
                        subTitle={q.subTitle}
                        options={q.options}
                        value={valueByIndex(idx)}
                        onChange={(v) => updateByIndex(idx, v)} // ← 즉시 적용
                        type={q.type}
                        apiRequestValue={q.apiRequestValue}
                        errorMessage={errorMessages[idx] ?? ''}
                    />
                ))}

                <div className="flex w-full justify-end">
                    <Button size="big-16" variant="mint" className="w-fit text-center px-[30px] font-body1" onClick={onClose}>
                        데이트 코스 {number}개 보기
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
