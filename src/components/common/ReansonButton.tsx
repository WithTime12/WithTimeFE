//setting - 탈퇴 사유 버튼 컴포넌트

// 버튼 props
interface IReasonButtonProps {
    label: string;
    onClick?: () => void;
    isSelected?: boolean;
}

export default function ReasonButton({ label, onClick, isSelected = false }: IReasonButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-4 py-3 rounded-[12px] border font-body1 transition-colors
                ${
                    isSelected
                        ? 'bg-primary-700 text-white' // 선택
                        : 'bg-white hover:bg-primary-100 border-default-gray-500 text-default-gray-700' // 기본 + hover
                }
            `}
        >
            {label}
        </button>
    );
}
