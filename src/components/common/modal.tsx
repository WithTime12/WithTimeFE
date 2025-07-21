import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ErrorCircleBlank from '@/assets/icons/Error-circle_Blank.svg?react';

type TModalprops = {
    isOpen?: boolean;
    title?: string;
    children: ReactNode;
    onClose: () => void;
};

export default function Modal({ isOpen = true, title, children, onClose }: TModalprops) {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    return createPortal(
        isVisible && (
            <div className="z-[1000] fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/30 flex items-center justify-center ">
                <div className="relative bg-white p-[30px] flex flex-col rounding-16 shadow-default w-[400px] ">
                    <div className="w-full flex items-center justify-between mb-2">
                        <div className="text-[38px] font-bold">{title}</div>
                        <div className="flex justify-end p-[5px]" onClick={onClose}>
                            <ErrorCircleBlank width={56} height={56} fill="#c3c3c3" stroke="#ffffff" />
                        </div>
                    </div>
                    <div className="flex p-[30px]">{children}</div>
                </div>
            </div>
        ),
        document.getElementById('modal-root')!,
    );
}
