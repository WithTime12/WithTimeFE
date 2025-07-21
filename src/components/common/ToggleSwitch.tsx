//setting - ON, OFF Toggle Switch
import { useEffect, useState } from 'react';

// Props 정의
interface IToggleSwitchProps {
    value?: boolean;
    onChange?: (val: boolean) => void;
    onLabel?: string;
    offLabel?: string;
    className?: string;
}

export default function ToggleSwitch({ value, onChange, onLabel = 'ON', offLabel = 'OFF', className = '' }: IToggleSwitchProps) {
    // 내부 상태 관리 (초깃값은 props.value, 없으면 false)
    const [isOn, setIsOn] = useState(value ?? false);

    // 외부에서 value가 바뀌면 내부 상태도 동기화
    useEffect(() => {
        if (value !== undefined) {
            setIsOn(value);
        }
    }, [value]);

    // 버튼 클릭 시 상태 토글
    const handleToggle = () => {
        const next = !isOn;
        setIsOn(next);
        onChange?.(next);
    };

    return (
        <button
            onClick={handleToggle}
            className={`relative w-[100px] h-[40px] rounded-full flex items-center px-2 transition-colors duration-300
        ${isOn ? 'bg-primary-500' : 'bg-default-gray-400'} ${className}`}
        >
            {/* ON */}
            <span
                className={`absolute left-[15px] top-1/2 -translate-y-1/2 font-heading3 text-white transition-opacity duration-300 ${
                    isOn ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {onLabel}
            </span>

            {/* OFF */}
            <span
                className={`absolute right-[15px] top-1/2 -translate-y-1/2 font-heading3 text-white transition-opacity duration-300 ${
                    !isOn ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {offLabel}
            </span>

            {/* 원형 토글 - 좌우 슬라이드 */}
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-default transform transition-transform duration-300 ${
                    isOn ? 'translate-x-[60px]' : 'translate-x-0'
                }`}
            />
        </button>
    );
}
