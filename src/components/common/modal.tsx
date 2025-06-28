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
            <div className="z-[1000] fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center">
                <div className="relative bg-white p-4 flex flex-col">
                    <div className="w-full flex justify-end" onClick={onClose}>
                        X
                    </div>
                    <div className="w-full h-full">{children}</div>
                </div>
            </div>
        ),
        document.getElementById('modal-root')!,
    );
}
