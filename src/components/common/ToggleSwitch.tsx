import { useEffect, useState } from 'react';

interface IToggleSwitchProps {
    value?: boolean;
    onChange?: (val: boolean) => void;
    onLabel?: string;
    offLabel?: string;
    className?: string;
}

export default function ToggleSwitch({ value, onChange, onLabel = 'ON', offLabel = 'OFF', className = '' }: IToggleSwitchProps) {
    const [isOn, setIsOn] = useState(value ?? false);

    useEffect(() => {
        if (value !== undefined) {
            setIsOn(value);
        }
    }, [value]);

    const handleToggle = () => {
        const next = !isOn;
        setIsOn(next);
        onChange?.(next);
    };

    return (
        <button
            onClick={handleToggle}
            className={`relative w-[80px] min-w-[80px] h-[36px] shrink-0 rounded-full flex items-center px-2 transition-colors duration-300
                ${isOn ? 'bg-primary-500' : 'bg-default-gray-400'} ${className}`}
        >
            {/* 텍스트 ON */}
            <span className={`absolute left-[36px] font-heading3 text-white transition-opacity duration-200 ${isOn ? 'opacity-100' : 'opacity-0'}`}>
                {onLabel}
            </span>

            {/* 텍스트 OFF */}
            <span className={`absolute right-[36px] font-heading3 text-white transition-opacity duration-200 ${!isOn ? 'opacity-100' : 'opacity-0'}`}>
                {offLabel}
            </span>

            {/* 원형 토글 */}
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-default transition-transform duration-300 ${isOn ? 'translate-x-0' : 'translate-x-[40px]'}`}
            />
        </button>
    );
}
