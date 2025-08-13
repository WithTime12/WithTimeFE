import React, { useEffect, useRef, useState } from 'react';

import SearchIcon from '@/assets/icons/Search_Blank.svg?react';

interface IEditableInputBoxProps {
    mode?: 'nickname' | 'search' | 'default';
    type?: 'text';
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    maxLength?: number;
    onCancel?: () => void;
    onSubmit?: () => void;
    onSearchClick?: () => void;
    className?: string;
    placeholder?: string;
    readOnly?: boolean;
    onEditStart?: () => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function EditableInputBox({
    mode = 'default',
    type,
    label = '',
    value,
    onChange,
    maxLength = 20,
    onCancel,
    onSubmit,
    onSearchClick,
    className = '',
    placeholder = '',
    readOnly = false,
    onEditStart,
    onFocus,
}: IEditableInputBoxProps) {
    const [isEditing, setIsEditing] = useState(false);

    const isNickname = mode === 'nickname';
    const isSearch = mode === 'search';

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    // 편집 모드 - 자동 포커스 + 전체 선택
    useEffect(() => {
        const el = inputRef.current;
        if (isNickname && isEditing && el) {
            requestAnimationFrame(() => {
                el.focus();
                if ('select' in el) {
                    (el as HTMLInputElement | HTMLTextAreaElement).select();
                }
            });
        }
    }, [isNickname, isEditing]);

    const handleCancel = () => {
        setIsEditing(false);
        onCancel?.();
    };

    const handleSubmit = () => {
        setIsEditing(false);
        onSubmit?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isSearch) {
            onSearchClick?.();
        }
    };

    const sharedClassName = `w-full
        ${isNickname && isEditing ? 'h-24 pt-4 pr-20' : 'h-12 pr-16'}
        pl-4
        border border-primary-500
        rounding-16
        text-base font-medium
        text-black
        caret-primary-500
        placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-primary-500
        leading-normal 
        transition-all duration-300
    `;

    return (
        <div className={`w-full max-w-[360px] ${className}`}>
            {label && <p className="font-body1 text-default-gray-700 mb-1">{label}</p>}

            <div className="relative w-full">
                {/* 닉네임 */}
                {isNickname && isEditing ? (
                    <textarea
                        ref={(el) => {
                            inputRef.current = el;
                        }}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className={`${sharedClassName} resize-none`}
                        onFocus={onFocus}
                    />
                ) : (
                    <input
                        ref={(el) => {
                            inputRef.current = el;
                        }}
                        type={type ?? 'text'}
                        value={value}
                        onChange={onChange}
                        readOnly={readOnly || (isNickname ? !isEditing : false)}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        onKeyDown={handleKeyDown}
                        className={sharedClassName}
                        onFocus={onFocus}
                    />
                )}

                {/* 수정 */}
                {isNickname && !isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(true);
                            onEditStart?.();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 font-body1 px-3 py-1 rounded-full bg-default-gray-400 text-default-gray-700"
                    >
                        수정
                    </button>
                )}

                {/* 글자 수 */}
                {isNickname && isEditing && (
                    <span className="absolute bottom-2 right-4 font-body1 text-default-gray-500">
                        {value.length} / {maxLength}
                    </span>
                )}

                {/* 검색 */}
                {isSearch && (
                    <button type="button" onClick={onSearchClick} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                        <SearchIcon className="w-5 h-5 text-primary-500" stroke="currentColor" />
                    </button>
                )}
            </div>

            {/* 취소, 완료 */}
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
