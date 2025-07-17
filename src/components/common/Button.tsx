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
        'big-32': 'rounding-32 py-6',
        'big-16': 'rounding-16 py-4',
        'small': 'rounding-32 py-2',
    };

    const variantClasses = {
        mint: 'bg-primary-500 text-white hover:text-primary-900',
        white: 'bg-default-gray-400 text-black hover:bg-default-gray-500',
    };

    return (
        <button
            className={cx(
                'px-4 font-medium transition-colors duration-200',
                sizeClasses[size],
                variantClasses[variant],
                disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                className,
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
