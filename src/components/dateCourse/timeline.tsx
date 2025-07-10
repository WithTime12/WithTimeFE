import { useState } from 'react';

import KeywordButton from './keywordButton';

import ArrowDown from '@/assets/icons/Arrow-Down_Blank.svg?react';
import Blub from '@/assets/icons/blub_Blank.svg?react';
import Cash from '@/assets/icons/cash_Blank.svg?react';
import CheckSuccess from '@/assets/icons/Check-Success-Blank.svg?react';
import Location from '@/assets/icons/Location_Blank.svg?react';

type TTimeline = {
    end?: boolean;
    title?: string;
    time: string;
    address?: string;
    price?: string;
    tags?: string[];
    menu?: string;
};
function Timeline({ end = false, title, time, address, price, tags, menu }: TTimeline) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex w-full gap-2 flex-col">
            <div className="flex justify-center gap-2 items-center" onClick={() => (end ? undefined : setOpen(!open))}>
                <div className="flex items-center h-full font-body2  select-none">{time}</div>
                <div className="flex flex-1 h-full justify-center items-center">
                    <div className="rounded-full w-[5px] h-[5px] bg-default-gray-700" />
                    <div className="flex-1 border-[1px] border-default-gray-700" />
                </div>
                <div className="flex gap-[8px] items-center">
                    <div className="underline font-body1  select-none">{end ? 'End' : title}</div>
                    {!end && <ArrowDown className={`${!open && 'rotate-90'}`} stroke="#000000" />}
                </div>
            </div>

            {open && (
                <div className="flex items-start self-stretch w-full gap-[9px]">
                    <div className="flex flex-col w-[45%] h-full justify-between">
                        <div className="flex gap-[8px] font-body1  select-none">
                            WithTime Pick <CheckSuccess stroke={'#000000'} />
                        </div>
                        <KeywordButton tag={menu!} />
                    </div>
                    <div className="flex flex-col h-full w-[55%] gap-[16px]">
                        <div className="flex gap-[16px] font-body2 text-default-gray-800 break-keep">
                            <Location stroke="#000000" width={'18px'} />
                            {address}
                        </div>
                        <div className="flex gap-[16px] font-body2 text-default-gray-800  select-none">
                            <Cash stroke="#000000" width={'18px'} />
                            {price}
                        </div>
                        <div className="flex gap-[16px] font-body2 text-default-gray-800 ">
                            <Blub stroke="#000000" className="pt-[4px]" width={'18px'} />
                            <div className="flex gap-[16px] flex-wrap">
                                {tags!.map((tag, idx) => {
                                    return <KeywordButton key={idx} tag={tag} />;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Timeline;
