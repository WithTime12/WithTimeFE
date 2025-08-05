import React from 'react';

import ArrowLeftCircle from '@/assets/icons/Arrow_left_circle.svg?react';
import ErrorCircle from '@/assets/icons/Error-circle_Fill.svg?react';

type TGraySVGButton = {
    child?: React.ReactNode;
    type?: 'cancle' | 'backward';
    onClick: () => void;
    size?: 'big' | 'default';
};

function GraySvgButton({ child, type, onClick, size = 'default' }: TGraySVGButton) {
    const svgSize = size == 'big' ? '56' : '35';
    return (
        <div className={`rounded-full hover:cursor-pointer ${size == 'big' ? 'w-[56px] h-[56px]' : 'h-[35px] w-[35px]'}`} onClick={onClick}>
            {child && child}
            {type == 'backward' && <ArrowLeftCircle className="z-10" fill="#c3c3c3" width={svgSize} height={svgSize} />}
            {type == 'cancle' && <ErrorCircle className="z-10 w-full h-full" fill="#c3c3c3" />}
        </div>
    );
}

export default GraySvgButton;
