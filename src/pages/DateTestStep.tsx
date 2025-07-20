import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface IQuestion {
    id: number;
    title: string;
    options: string[];
}

const TOTAL_QUESTIONS = 40;
const dummyQuestions: IQuestion[] = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
    id: i + 1,
    title: `당신의 데이트 스타일은 어떤가요?`,
    options: ['야외 활동 좋아해요', '집에서 쉬는 게 좋아요'],
}));

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

    const currentStep = Number(step);
    const question = dummyQuestions[currentStep - 1];

    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    useEffect(() => {
        setSelectedOptions([]);
        window.scrollTo(0, 0);
    }, [currentStep]);

    const handleSelect = (idx: number) => {
        setSelectedOptions([idx]); // 항상 하나만 선택되도록
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            navigate(`/datetest/${currentStep - 1}`);
        } else {
            navigate('/datetest');
        }
    };

    const handleNext = () => {
        if (selectedOptions.length !== 1) return;
        if (currentStep < TOTAL_QUESTIONS) {
            navigate(`/datetest/${currentStep + 1}`);
        } else {
            navigate('/datetest/result');
        }
    };

    if (!question) {
        return <div>질문을 불러올 수 없습니다.</div>;
    }

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
            <h2 className="text-2xl font-bold mb-6 text-left w-full">{question.title}</h2>

            {/* 선택지 */}
            <div className="flex flex-col gap-4 w-full">
                {question.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`w-full text-left px-5 py-3 rounded-lg border border-[#C3C3C3]
            ${selectedOptions.includes(idx) ? 'bg-primary-700 text-white border-primary-700' : 'bg-white text-gray-800 hover:bg-primary-100 border border-[#c3c3c3]'}`}
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
