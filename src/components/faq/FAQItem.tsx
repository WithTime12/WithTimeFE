//Question - 질문 토글 컴포넌트
import ChevronDown from '@/assets/icons/default_arrows/chevron_down.svg?react';

//props 타입 정의
interface IFAQItemProps {
    item: {
        category: string;
        question: string;
        answer: string;
    };
    isOpen: boolean;
    onToggle: () => void;
}

export default function FAQItem({ item, isOpen, onToggle }: IFAQItemProps) {
    return (
        <li className="py-4">
            {/* 질문 영역 - 클릭 시 토글 */}
            <button onClick={onToggle} className="flex w-full items-center gap-4 text-left" aria-expanded={isOpen}>
                {/* 카테고리 배지 */}
                <span className="px-3 py-2 font-body2 rounded-full bg-primary-100 text-default-gray-700 whitespace-nowrap">{item.category}</span>

                {/* 화살표 아이콘 */}
                <ChevronDown className="stroke-current text-primary-500" />

                {/* 질문 텍스트 */}
                <span className="font-body2 text-default-gray-800">Q. {item.question}</span>
            </button>

            {/* 답변 영역 */}
            {isOpen && <div className="mt-4 ml-9 px-4 py-3 rounded-md leading-relaxed whitespace-pre-line text-default-gray-700 font-body2">{item.answer}</div>}
        </li>
    );
}
