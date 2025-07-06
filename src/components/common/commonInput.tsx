import React from 'react';

// import AlertCircle from '@/assets/icons/alert-circle_Fill.svg';

type TCommonInputProps = {
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
};

const CommonInput = React.forwardRef<HTMLInputElement, TCommonInputProps>(
    ({ type, placeholder, title, validation = false, value, errorMessage, error, button, buttonText, validationState, ...rest }: TCommonInputProps, ref) => {
        return (
            <div className="flex w-full relative text-default-gray-800">
                <div
                    className={`absolute bg-default-gray-100 font-body2 z-2 left-2 top-[-8px] px-[4px]
              ${validation ? 'text-primary-500' : `${error ? 'text-warning' : 'text-default-gray-800'}`}
              `}
                >
                    {title}
                </div>
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    className={`w-full bg-default-gray-100 rounded-[4px] h-[56px] pl-[16px] text-default-gray-800 focus:outline-none  focus:ring-0 
                  ${validation ? 'border-[2px] border-primary-500' : `${error ? 'border-warning border-[2px] caret-warning' : 'border-default-gray-700 border-[1px]'}`}
                `}
                    {...rest}
                />
                {button && <button>{buttonText}</button>}
                {validation && <div>{validationState}</div>}
                {error && <div className="absolute top-[62px] font-caption text-warning left-[16px]">{errorMessage}</div>}
                {/* {error && <AlertCircle fill="#ff517c" />} */}
            </div>
        );
    },
);

export default CommonInput;
