import type { ReactElement } from 'react';

import ArrowLeftCircle from '@/assets/icons/Arrow_left_circle.svg?react';
import ErrorCircle from '@/assets/icons/Error-circle_Fill.svg?react';

type TGraySVGButton = {
    child?: ReactElement;
    type?: 'cancle' | 'backward';
    onClick: () => void;
};
function GraySvgButton({ child, type, onClick }: TGraySVGButton) {
    return (
        <div className="rounded-full w-[56px] h-[56px] hover: cursor-pointer" onClick={onClick}>
            {child && child}
            {type == 'backward' && <ArrowLeftCircle className="z-10" fill="#c3c3c3" />}
            {type == 'cancle' && <ErrorCircle className="z-10 w-full h-full" fill="#c3c3c3" />}
        </div>
    );
}

export default GraySvgButton;
