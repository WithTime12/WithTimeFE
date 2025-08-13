import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import type { IDateTestQuestion } from '@/types/datetest/datetest';

import { getDateQuestions, submitDateTestAnswers } from '@/api/datetest/datetest';

const TOTAL_QUESTIONS = 40;

function ProgressBar({ step, total }: { step: number; total: number }) {
    const percentage = (step / total) * 100;
    return (
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${percentage}%` }} />
        </div>
    );
}

export default function DateTestStep() {
    const { step } = useParams<{ step: string }>();
    const navigate = useNavigate();
    const currentStep = parseInt(step ?? '1', 10);

    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [allAnswers, setAllAnswers] = useState<number[]>(Array(TOTAL_QUESTIONS).fill(0));

    const { data, isLoading, isError } = useQuery<IDateTestQuestion[]>({
        queryKey: ['dateTestQuestions'],
        queryFn: getDateQuestions,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        const prevAnswer = allAnswers[currentStep - 1];
        setSelectedOptions(prevAnswer ? [prevAnswer - 1] : []);
        window.scrollTo(0, 0);
    }, [currentStep]);

    const handleSelect = (idx: number) => {
        const answerValue = idx + 1; // 0 -> 1, 1 -> 2
        const updatedAnswers = [...allAnswers];
        updatedAnswers[currentStep - 1] = answerValue;
        setAllAnswers(updatedAnswers);
        setSelectedOptions([idx]);
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            navigate(`/datetest/${currentStep - 1}`);
        } else {
            navigate('/datetest');
        }
    };

    const handleNext = async () => {
        if (selectedOptions.length !== 1) return;

        if (currentStep < TOTAL_QUESTIONS) {
            navigate(`/datetest/${currentStep + 1}`);
        } else {
            try {
                const response = await submitDateTestAnswers({ answers: allAnswers });
                console.log('결과 응답:', response);
                navigate('/datetest/result', { state: response.result });
            } catch (error) {
                console.error('결과 제출 실패:', error);
                alert('결과를 제출하는 중 오류가 발생했습니다.');
            }
        }
    };

    if (isLoading) return <div className="text-center mt-20">질문을 불러오는 중입니다...</div>;
    if (isError || !data || !data[currentStep - 1]) return <div>질문을 불러올 수 없습니다.</div>;

    const question = data[currentStep - 1];

    return (
        <div className="flex flex-col px-6 max-w-3xl mx-auto py-[156px]">
            {/* 이전 버튼 */}
            <div className="relative h-10 mb-2">
                {currentStep > 1 && (
                    <button
                        onClick={handlePrev}
                        className="absolute -top-2 -left-20 w-8 h-8 rounded-full bg-[#C3C3C3] hover:bg-gray-300 flex items-center justify-center"
                        aria-label="이전 질문"
                    >
                        <span className="text-lg select-none text-white">←</span>
                    </button>
                )}
            </div>

            {/* 게이지바 */}
            <div className="w-full mb-8">
                <ProgressBar step={currentStep} total={TOTAL_QUESTIONS} />
            </div>

            {/* 질문 번호 */}
            <div className="text-left w-full text-sm text-gray-500 mb-1">
                {currentStep} / {TOTAL_QUESTIONS}
            </div>

            {/* 질문 */}
            <h2 className="text-2xl font-bold mb-6 text-left w-full">{question.question}</h2>

            {/* 선택지 */}
            <div className="flex flex-col gap-4 w-full">
                {[question.firstAnswer, question.secondAnswer].map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`w-full text-left px-5 py-3 rounded-lg border ${
                            selectedOptions.includes(idx)
                                ? 'bg-primary-700 text-white border-primary-700'
                                : 'bg-white text-gray-800 hover:bg-primary-100 border-[#c3c3c3]'
                        }`}
                        aria-pressed={selectedOptions.includes(idx)}
                        type="button"
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* 다음 버튼 */}
            <button
                onClick={handleNext}
                disabled={selectedOptions.length !== 1}
                className="mt-10 w-[335px] py-3 rounded-[16px] bg-primary-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors mx-auto"
            >
                {currentStep === TOTAL_QUESTIONS ? '결과 보기' : '다음'}
            </button>
        </div>
    );
}
