import type { TDateCourseOptionButtonProps } from '@/types/dateCourse';

export default function DateCourseOptionButton({ option, isSelected, onClick }: TDateCourseOptionButtonProps) {
    return (
        <div
            onClick={onClick}
            className={`flex rounding-32 justify-center items-center px-[32px] py-[16px] font-body1
            border-[1px] 
            ${isSelected ? 'bg-primary-700 text-default-gray-100 border-transparent' : 'bg-default-gray-100 text-default-gray-700 hover:bg-primary-100 hover:text-default-gray-700 border-default-gray-500'}
            `}
        >
            {option}
        </div>
    );
}
