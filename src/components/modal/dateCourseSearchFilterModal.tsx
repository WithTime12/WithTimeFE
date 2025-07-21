import { useState } from 'react';

import { DateCourseQuestion } from '@/constants/dateCourseQuestion';

import Button from '../common/Button';
import Modal from '../common/modal';
import DateCourseSearchFilterOption from '../dateCourse/dateCourseSearchFilterOption';

type TDateCourseSearchFilterModalProps = {
    onClose: () => void;
    filterType: 'mine' | 'find';
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

export default function DateCourseSearchFilterModal({ onClose, filterType }: TDateCourseSearchFilterModalProps) {
    const [answers, setAnswers] = useState<(string | string[] | null)[]>(Array(7).fill(null));
    const num = 5325; // 예시용

    const handleSearch = () => {
        console.log('선택된 필터:', answers);
        console.log('필터 유형:', filterType);
        onClose();
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col w-[1000px] max-w-[80vw] px-[10%] gap-10 py-10">
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
                            />
                        ),
                )}
                <div className="flex w-full justify-end">
                    <Button size="big-16" variant="mint" className="w-fit text-center" onClick={handleSearch}>
                        데이트 코스 {num}개 보기
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
