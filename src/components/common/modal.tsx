import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import GraySvgButton from './graySvgButton';

type TModalprops = {
    isOpen?: boolean;
    title?: string;
    children: ReactNode;
    onClose: () => void;
    position?: 'default' | 'main';
};

export default function Modal({ isOpen = true, title, children, onClose, position }: TModalprops) {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    return createPortal(
        isVisible && (
            <div
                className={`z-[1000] fixed w-[100vw] h-[100dvh] inset-0 bg-black/30 flex items-center justify-center
            `}
            >
                <div className={`flex ${position === 'main' && 'md:w-[1280px] flex px-8 md:justify-end md:items-start items-center md:py-[90px] h-full'}`}>
                    <div
                        className={`relative bg-white md:px-[48px] px-[20px] py-[40px] flex flex-col rounding-16 shadow-default w-fit max-h-[90dvh] h-fit sm:max-w-[70vw] max-w-[95vw] overflow-y-auto gap-[10px]`}
                    >
                        <div className="w-full flex items-center justify-between mb-2 px-[28px] md:px-0">
                            <div className="font-heading2 text-default-gray-800">{title}</div>
                            <GraySvgButton type="cancle" onClick={onClose} />
                        </div>
                        <div className="flex">{children}</div>
                    </div>
                </div>
            </div>
        ),
        document.getElementById('modal-root')!,
    );
}
