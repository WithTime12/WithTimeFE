import type { InputHTMLAttributes } from 'react';
import React from 'react';

import formatInputNumber from '@/utils/formatPhoneNumber';

import Button from '@/components/common/Button';

import AlertCircle from '@/assets/icons/alert-circle_Fill.svg?react';

type TCommonAuthInputProps = {
    type?: string;
    placeholder?: string;
    title?: string;
    validation?: boolean;
    validationState?: string;
    error?: boolean;
    value?: string;
    errorMessage?: string;
    button?: boolean;
    buttonText?: string;
    buttonOnclick?: () => void;
    short?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const CommonAuthInput = React.forwardRef<HTMLInputElement, TCommonAuthInputProps>(
    (
        {
            type,
            placeholder,
            title,
            validation = false,
            value,
            errorMessage,
            error,
            button,
            buttonText,
            buttonOnclick,
            short,
            validationState,
            ...rest
        }: TCommonAuthInputProps,
        ref,
    ) => {
        return (
            <div className="flex w-full relative text-default-gray-800 items-center gap-[16px]">
                <div
                    className={`absolute bg-default-gray-100 font-body2 z-2 left-2 top-[-8px] px-[4px] select-none
                                ${error ? 'text-warning' : `${validation ? 'text-primary-500' : 'text-default-gray-800'}`}
                    `}
                >
                    {title}
                </div>
                <input
                    ref={ref}
                    type={type === 'phoneNum' ? 'text' : type}
                    placeholder={placeholder}
                    value={value}
                    className={`flex-1 relative flex bg-default-gray-100 rounded-[4px] max-h-[56px] min-w-0 h-[8vh] pl-[16px] text-default-gray-800 focus:outline-none  focus:ring-0 
                                ${error ? 'border-[2px] border-warning caret-warning' : `${validation ? 'border-primary-500 border-[2px] ' : 'border-default-gray-700 border-[1px]'}`}
                    `}
                    onChange={(e) => {
                        const rawValue = e.target.value;
                        const formatted = type === 'phoneNum' ? formatInputNumber(rawValue) : rawValue;

                        // 외부에서 넘긴 onChange 핸들러에 적용된 값 전달
                        if (rest.onChange) {
                            rest.onChange({
                                ...e,
                                target: {
                                    ...e.target,
                                    value: formatted,
                                },
                            });
                        }
                    }}
                    {...rest}
                />
                {short && <div className="flex px-[16px] py-[8px] text-default-gray-100 w-[80px]" />}
                {button && (
                    <Button
                        size="small"
                        variant={`${validation ? 'mint' : 'white'}`}
                        children={buttonText}
                        disabled={type === 'code' ? false : error || !validation}
                        className={`hover:!cursor-pointer ${validation ? 'hover:!bg-primary-500 hover:!text-[#ffffff]' : 'hover:!bg-default-gray-400'}`}
                        onClick={buttonOnclick}
                        type="button"
                    />
                )}
                {validationState && (
                    <Button
                        size="small"
                        variant={validation ? 'mint' : 'white'}
                        children={validationState}
                        disabled={!validation}
                        className={`hover:!cursor-default ${validation ? 'hover:!bg-primary-500 hover:!text-[#ffffff]' : 'hover:!bg-default-gray-400'}`}
                    />
                )}
                {error && <div className="absolute top-[62px] font-caption text-warning left-[16px] select-none">{errorMessage}</div>}
                {error && <AlertCircle fill="#ff517c" className={`absolute ${button || short || validationState ? 'right-30' : ' right-3'}`} />}
            </div>
        );
    },
);

export default CommonAuthInput;
