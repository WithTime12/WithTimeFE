type TKeywordButtonProps = {
    tag: string;
    selected?: boolean;
    onClick?: () => void;
    isButton?: boolean;
};

export default function KeywordButton({ tag, selected = false, onClick, isButton }: TKeywordButtonProps) {
    return (
        <div
            onClick={isButton ? onClick : undefined}
            className={`flex flex-nowrap rounding-32 px-[16px] py-[8px] font-body2 w-fit select-none
        ${selected ? 'bg-primary-700 text-white' : 'bg-default-gray-400 text-default-gray-700'}
        ${isButton && 'cursor-pointer'}
        `}
        >
            {tag}
        </div>
    );
}
