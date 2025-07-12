export default function DateCourseOptionButton({ option, isSelected, onClick }: { option: string; isSelected: boolean; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`flex justify-center items-center px-[16px] py-[24px] hover:bg-primary-100 border-[1px] border-default-gray-500 font-heading3 text-default-gray-700
      ${isSelected ? 'bg-primary-700 border-none text-default-gray-100' : 'bg-default-gray-100 '}
      `}
        >
            {option}
        </div>
    );
}
