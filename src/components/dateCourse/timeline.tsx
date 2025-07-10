import { useState } from 'react';

import ArrowDown from '@/assets/icons/Arrow-Down_Blank.svg?react';
import CheckSuccess from '@/assets/icons/Check-Success-Blank.svg?react';

type TTimeline = {
    end?: boolean;
    title: string;
    time: string;
    address: string;
    price: string;
    tags: string[];
    menu: string;
};
function Timeline({ end = false, title, time, address, price, tags, menu }: TTimeline) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex w-full gap-2 flex-col" onClick={() => setOpen(!open)}>
            <div className="flex justify-center gap-2 items-center">
                <div className="flex items-center h-full font-body2">{time}</div>
                <div className="flex flex-1 h-full justify-center items-center">
                    <div className="rounded-full w-[5px] h-[5px] bg-default-gray-700" />
                    <div className="flex-1 border-[1px] border-default-gray-700" />
                </div>
                <div className="flex gap-[8px] items-center">
                    <div className="underline font-body1">{end ? 'End' : title}</div>
                    {!end && <ArrowDown className={`${!open && 'rotate-90'}`} stroke="#000000" />}
                </div>
            </div>

            {open && (
                <div className="flex w-full">
                    <div className="flex flex-col">
                        <div>
                            WithTime Pick <CheckSuccess stroke={'#000000'} />
                        </div>
                    </div>
                    <div />
                </div>
            )}
        </div>
    );
}

export default Timeline;
