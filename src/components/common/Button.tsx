import React from 'react';
import cx from 'clsx';

interface IButtonProps {
    size: 'big-32' | 'big-16' | 'small';
    variant: 'mint' | 'white';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

export default function Button({ size, variant, disabled = false, onClick, className, children }: IButtonProps) {
    const sizeClasses = {
        'big-32': 'rounded-[32px] py-[24px]',
        'big-16': 'rounded-[16px] py-[16px]',
        'small': 'rounded-[16px] py-[8px]',
    };

    const variantClasses = {
        mint: disabled ? 'bg-primary-300 text-white' : 'bg-primary-300 text-white hover:bg-primary-900',
        white: disabled ? 'bg-gray-400 text-black' : 'bg-gray-400 text-black hover:bg-gray-500',
    };

    return (
        <button
            className={cx(
                'px-4 font-medium transition-colors duration-200',
                sizeClasses[size],
                variantClasses[variant],
                disabled && 'opacity-50 cursor-not-allowed',
                className,
            )}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
