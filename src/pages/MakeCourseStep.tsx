// MakeCourseStep.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DateCourseQuestion } from '@/constants/dateCourseQuestion';

import Button from '@/components/common/Button';
import GraySvgButton from '@/components/common/graySvgButton';
import DateCourseSearchFilterOption from '@/components/dateCourse/dateCourseSearchFilterOption';

interface IQuestion {
    id: number;
    title: string;
    options: string[] | null;
    keyword: string | null;
    subTitle: string | null;
    type: 'choice' | 'search' | 'time' | 'choices' | 'keyword';
}

const TOTAL_QUESTIONS = 8;

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
    const [answers, setAnswers] = useState<(string | string[] | null)[]>(Array(TOTAL_QUESTIONS).fill(null));
    const { step } = useParams<{ step: string }>();
    const navigate = useNavigate();

    const currentStep = Number(step);
    const question = Questions[currentStep - 1];

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0 }); // <html>
        document.body.scrollTo({ top: 0 }); // <body>
    }, [currentStep]);

    const handlePrev = () => {
        if (currentStep > 1) {
            navigate(`/makeCourse/${currentStep - 1}`);
        } else {
            navigate('/makeCourse');
        }
    };

    const handleNext = () => {
        const answer = answers[currentStep - 1];
        const isValid = typeof answer === 'string' ? answer.trim().length > 0 : Array.isArray(answer) && answer.length > 0;

        if (!isValid) return;

        if (currentStep < TOTAL_QUESTIONS - 1) {
            navigate(`/makeCourse/${currentStep + 1}`);
        } else {
            navigate('/makeCourse/result');
        }
    };

    if (!question) {
        return <div>질문을 불러올 수 없습니다.</div>;
    }

    const setAnswer = (value: string | string[]) => {
        const updated = [...answers];
        updated[currentStep - 1] = value;
        setAnswers(updated);
    };

    const currentAnswer = answers[currentStep - 1];

    return (
        <div className="flex flex-col px-6 max-w-[90vw] w-[1000px] mx-auto pt-[50px] pb-[150px] gap-[10px] min-h-[90vh] h-fit">
            <div className="w-full">
                <GraySvgButton type="backward" onClick={handlePrev} size="small" />
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
                    value={answers[currentStep - 1]}
                    onChange={setAnswer}
                />
                <div className="mt-[120px] flex w-full items-center justify-center">
                    <Button
                        className="w-fit px-[100px] items-center self-center"
                        onClick={handleNext}
                        variant="mint"
                        size="big-16"
                        disabled={currentAnswer === null || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
                    >
                        {currentStep === TOTAL_QUESTIONS ? '결과 보기' : '다음'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
