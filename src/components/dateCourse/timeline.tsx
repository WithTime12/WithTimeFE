import { useState } from 'react';

import type { TTimeline } from '@/types/dateCourse/dateCourse';

import KeywordButton from './keywordButton';

import ArrowDown from '@/assets/icons/Arrow-Down_Blank.svg?react';
import Blub from '@/assets/icons/blub_Blank.svg?react';
import Cash from '@/assets/icons/cash_Blank.svg?react';
import CheckSuccess from '@/assets/icons/Check-Success-Blank.svg?react';
import Location from '@/assets/icons/Location_Blank.svg?react';

function Timeline({ end = false, image, name, placeCategoryResponseList, roadNameAddress, averagePrice, time, signatureDish }: TTimeline) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex w-full gap-2 flex-col">
            <div className={`${!end && 'hover:cursor-pointer'} flex justify-center gap-2 items-center`} onClick={() => (end ? undefined : setOpen(!open))}>
                <div className="flex items-center h-full font-body2 select-none">
                    {time.split(':')[0]}:{time.split(':')[1]}
                </div>
                <div className="flex flex-1 h-full justify-center items-center">
                    <div className="rounded-full w-[5px] h-[5px] bg-default-gray-700" />
                    <div className="flex-1 border-[1px] border-default-gray-700" />
                </div>
                <div className="flex gap-[8px] items-center">
                    <div className="underline font-body1 select-none">{end ? 'End' : name}</div>
                    {!end && <ArrowDown className={`min-w-[24px] ${!open && 'rotate-90'}`} stroke="#000000" />}
                </div>
            </div>

            {open && (
                <div className="flex lg:items-start self-stretch w-full gap-[9px] flex-col lg:flex-row itmes-center">
                    <div className="flex flex-col gap-[8px] lg:w-[50%] max-h-fit justify-around items-start">
                        {signatureDish && (
                            <div className="flex w-full flex-col ">
                                <div className="flex gap-[8px] font-body1 select-none text-center items-center h-[24px] w-full">
                                    <div className="flex text-center h-full">WithTime Pick</div>
                                    <CheckSuccess stroke={'#000000'} />
                                </div>
                                <KeywordButton tag={signatureDish.name!} />
                            </div>
                        )}
                        {image && <img src={image} className="w-[80%] self-start" />}
                    </div>
                    <div className="flex flex-col h-full lg:w-[50%] gap-[16px]">
                        <div className="flex gap-[16px] font-body2 text-default-gray-800 break-keep lg:items-start items-center">
                            <Location stroke="#000000" className="min-w-[24px]" />
                            {roadNameAddress}
                        </div>
                        <div className="flex gap-[16px] font-body2 text-default-gray-800 items-center select-none">
                            <Cash stroke="#000000" className="min-w-[24px]" />
                            {averagePrice}원
                        </div>
                        <div className="flex gap-[16px] font-body2 text-default-gray-800 lg:items-start">
                            <Blub stroke="#000000" className="min-w-[24px] pt-[4px]" />
                            <div className="flex gap-[12px] flex-wrap items-center">
                                {placeCategoryResponseList!.map((tag, idx) => {
                                    return <KeywordButton key={idx} tag={tag.label} />;
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
