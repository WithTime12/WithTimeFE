import React, { useState } from 'react';

import SearchIcon from '@/assets/icons/Search_Blank.svg?react';

// props 타입 정의
interface IEditableInputBoxProps {
    mode?: 'nickname' | 'search' | 'default';
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    maxLength?: number;
    onCancel?: () => void;
    onSubmit?: () => void;
    onSearchClick?: () => void;
    className?: string;
    placeholder?: string;
}

// 구조 분해 할당
export default function EditableInputBox({
    mode = 'default',
    label = '',
    value,
    onChange,
    maxLength = 20,
    onCancel,
    onSubmit,
    onSearchClick,
    className = '',
    placeholder = '',
}: IEditableInputBoxProps) {
    const [isEditing, setIsEditing] = useState(false);

    const isNickname = mode === 'nickname';
    const isSearch = mode === 'search';

    // 닉네임 - 취소
    const handleCancel = () => {
        setIsEditing(false);
        onCancel?.();
    };

    // 닉네임 - 완료
    const handleSubmit = () => {
        setIsEditing(false);
        onSubmit?.();
    };

    // 검색 - Enter 검색
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isSearch) {
            onSearchClick?.();
        }
    };

    // 공통 클래스
    const sharedClassName = `w-full
    ${isNickname && isEditing ? 'h-24 pt-4 pr-20' : 'h-12 pr-16'}
    pl-4
    border border-primary-500
    rounded-[16px]
    text-base font-medium
    text-black
    caret-primary-500
    placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-primary-500
    leading-normal align-top
    transition-all duration-300
`;

    return (
        <div className={`w-[360px] ${className}`}>
            {/* 상단 라벨 텍스트 */}
            {label && <p className="font-body1 text-default-gray-700">{label}</p>}

            {/* 입력 필드 */}
            <div className="relative w-full">
                {isNickname && isEditing ? (
                    <textarea value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength} className={`${sharedClassName} resize-none`} />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        readOnly={isNickname && !isEditing}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        onKeyDown={handleKeyDown}
                        className={sharedClassName}
                    />
                )}

                {/* 닉네임 - 수정 버튼 */}
                {isNickname && !isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 font-body1 px-3 py-1 rounded-full bg-default-gray-400 text-default-gray-700"
                    >
                        수정
                    </button>
                )}

                {/* 닉네임 - 글자 수 */}
                {isNickname && isEditing && (
                    <span className="absolute bottom-2 right-4 font-body1 text-default-gray-500">
                        {value.length} / {maxLength}
                    </span>
                )}

                {/* 검색 아이콘 */}
                {isSearch && (
                    <button
                        type="button"
                        onClick={onSearchClick}
                        className="absolute right-3 top-1/2 -translate-y-1/2 border border-primary-500 rounded-full p-1"
                    >
                        <SearchIcon className="w-5 h-5 text-primary-500" stroke="currentColor" />
                    </button>
                )}
            </div>

            {/* 닉네임 - 취소/완료 버튼 */}
            {isNickname && isEditing && (
                <div className="flex justify-end gap-2 mt-3">
                    <button onClick={handleCancel} className="font-body1 px-4 py-1.5 rounded-full bg-default-gray-400 text-default-gray-700">
                        취소
                    </button>
                    <button onClick={handleSubmit} className="font-body1 px-4 py-1.5 rounded-full bg-default-gray-400 text-default-gray-700">
                        완료
                    </button>
                </div>
            )}
        </div>
    );
}
