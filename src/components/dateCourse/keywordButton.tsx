import type { TKeywordButtonProps } from '@/types/dateCourse/dateCourse';

export default function KeywordButton({ tag, selected = false, onClick, isButton }: TKeywordButtonProps) {
    return (
        <div
            onClick={isButton ? onClick : undefined}
            className={`flex whitespace-nowrap rounding-32 px-[16px] py-[8px] font-body2 min-w-fit w-fit select-none
        ${selected ? 'bg-primary-700 text-white' : 'bg-default-gray-400 text-default-gray-700'}
        ${isButton && 'cursor-pointer'}
        `}
        >
            #{tag}
        </div>
    );
}
