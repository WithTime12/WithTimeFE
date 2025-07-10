import { useState } from 'react';

import ArrowDown from '@/assets/icons/Arrow-Down_Blank.svg?react';

function Timeline() {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex h-[20px] w-full gap-2">
            <div className="flex text-center h-full font-body2">11:00</div>
            <div className="flex flex-1 h-full justify-center items-center">
                <div className="rounded-full w-[5px] h-[5px] bg-default-gray-700" />
                <div className="flex-1 border-[1px] border-default-gray-700" />
            </div>
            <div className="flex gap-[8px] items-center">
                <div className="underline font-body1">브리비트 성수</div>
                <ArrowDown className={`${open && 'rotate-90'}`} stroke="#000000" />
            </div>
        </div>
    );
}

export default Timeline;
