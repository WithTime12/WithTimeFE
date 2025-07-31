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
                className={`z-[1000] fixed w-[100vw] h-[100dvh] bg-black/30 flex items-center justify-center
            ${position === 'default' && 'inset-0'}
            ${position === 'main' && 'top-[115px] right-[95px]'}
            `}
            >
                <div className="relative bg-white lg:p-[30px] flex flex-col rounding-16 shadow-default w-fit max-h-[90dvh] max-w-[95vw] overflow-y-auto gap-[10px]">
                    <div className="w-full flex items-center justify-between mb-2 px-[30px] pt-[30px]">
                        <div className="font-heading2 text-default-gray-800">{title}</div>
                        <GraySvgButton type="cancle" onClick={onClose} />
                    </div>
                    <div className="flex md:p-[30px]">{children}</div>
                </div>
            </div>
        ),
        document.getElementById('modal-root')!,
    );
}
