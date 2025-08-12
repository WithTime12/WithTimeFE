import { useEffect, useState } from 'react';

import { DateCourseQuestion } from '@/constants/dateCourseQuestion';

import {
    BudgetTimeValidation,
    DateTimeStartValidation,
    KeywordGroupOverValidation,
    KeywordMealValidation,
    MealTimeValidation,
    TotalTimeMealValidation,
} from '@/utils/dateCourseValidation';

import Button from '../common/Button';
import Modal from '../common/modal';
import DateCourseSearchFilterOption from '../dateCourse/dateCourseSearchFilterOption';

type TDateCourseSearchFilterModalProps = {
    onClose: () => void;
};

interface IQuestion {
    id: number;
    title: string;
    options: string[] | null;
    keyword: string | null;
    subTitle: string | null;
    filterTitle: string;
    type: 'choice' | 'search' | 'time' | 'choices' | 'keyword';
}

// ✅ 질문 리스트 (0~6개만 필터링)
const Questions: IQuestion[] = Array.isArray(DateCourseQuestion)
    ? DateCourseQuestion.slice(0, 7).map((q) => ({
          ...q,
          type: q.type as IQuestion['type'],
      }))
    : [];

export default function DateCourseSearchFilterModal({ onClose }: TDateCourseSearchFilterModalProps) {
    const [answers, setAnswers] = useState<(string | string[] | null)[]>(Array(7).fill(null));
    const num = 5325; // 예시용
    const [errorMessages, setErrorMessages] = useState<string[]>(Array(7).fill(''));

    const handleSearch = () => {
        onClose();
    };

    const checkError = () => {
        const newErrors = [...errorMessages];

        newErrors[0] =
            BudgetTimeValidation({
                budget: answers[0] as string,
                totalTime: answers[2] as string,
            }) || '';

        newErrors[2] =
            TotalTimeMealValidation({
                totalTime: answers[2] as string,
                meal: Array.isArray(answers[3]) ? answers[3] : [],
            }) || '';

        newErrors[3] =
            KeywordMealValidation({
                meal: Array.isArray(answers[3]) ? answers[3] : [],
                keywords: Array.isArray(answers[5]) ? answers[5] : [],
            }) || '';

        newErrors[5] =
            KeywordGroupOverValidation({
                keywords: Array.isArray(answers[5]) ? answers[5] : [],
            }) || '';

        newErrors[6] =
            MealTimeValidation({
                meal: Array.isArray(answers[3]) ? answers[3] : [],
                time: answers[6] as string,
                totalTime: answers[2] as string,
            }) ||
            DateTimeStartValidation({
                time: answers[6] as string,
                totalTime: answers[2] as string,
            }) ||
            '';

        setErrorMessages(newErrors);
    };

    useEffect(() => {
        checkError();
    }, [answers]);

    return (
        <Modal onClose={onClose} title="검색 필터">
            <div className="flex flex-col w-full max-w-[80vw] px-[10%] gap-10 py-10">
                {Questions.map(
                    (question, idx) =>
                        question.filterTitle !== '' && (
                            <DateCourseSearchFilterOption
                                key={question.id}
                                title={question.filterTitle}
                                subTitle={question.subTitle}
                                options={question.options}
                                value={answers[idx]}
                                onChange={(value) => {
                                    setAnswers((prev) => {
                                        const updated = [...prev];
                                        updated[idx] = value;
                                        return updated;
                                    });
                                }}
                                type={question.type}
                                errorMessage={errorMessages[idx] ?? ''}
                            />
                        ),
                )}
                <div className="flex w-full justify-end">
                    <Button size="big-16" variant="mint" className="w-fit text-center px-[30px] font-body1" onClick={handleSearch}>
                        데이트 코스 {num}개 보기
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
