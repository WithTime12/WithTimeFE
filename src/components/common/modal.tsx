import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type TModalprops = {
    isOpen?: boolean;
    children: ReactNode;
    onClose: () => void;
};

export default function Modal({ isOpen = true, children, onClose }: TModalprops) {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    return createPortal(
        isVisible && (
            <div className="z-[1000] fixed inset-0 bg-black/30 overflow-y-auto">
                <div className="w-full flex items-center justify-center">
                    <div className="relative bg-white p-[20px] flex flex-col rounding-16 shadow-default">
                        <div className="w-full flex justify-end p-[5px]" onClick={onClose}>
                            X
                        </div>
                        <div className="flex">{children}</div>
                    </div>
                </div>
            </div>
        ),
        document.getElementById('modal-root')!,
    );
}
