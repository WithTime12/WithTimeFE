import { useState } from 'react';

import Info from './info';
import Timeline from './timeline';

import Bookmark from '@/assets/icons/Bookmark_Blank.svg?react';
import KeyboardArrowDown from '@/assets/icons/keyboard_arrow_down_False.svg?react';
import More from '@/assets/icons/more_False.svg?react';

function DateCourse() {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col h-fit rounding-32 border-b-[1px] border-r-[1px] border-l-[1px] border-primary-700 bg-default-gray-100">
            <div
                className={`w-full rounding-32 flex border-primary-700 px-[24px] py-[16px] bg-default-gray-100 shadow-default z-2
              ${open ? 'border-[1px]' : 'border-t-[1px]'}
              `}
            >
                <div className="flex w-full justify-between">
                    <div className="flex">
                        {open ? (
                            <KeyboardArrowDown onClick={() => setOpen(false)} />
                        ) : (
                            <KeyboardArrowDown className="rotate-270" onClick={() => setOpen(true)} />
                        )}

                        <div className="text-default-gray-800">2025.06.01 데이트코스</div>
                    </div>
                    <div className="flex ">
                        <Bookmark stroke="#000000" />
                        <More className="rotate-90" />
                    </div>
                </div>
            </div>
            {open && (
                <div className="w-full flex h-fit bg-default-gray-100 rounding-32 justify-center items-start self-stretch">
                    <div className="w-full px-[48px] py-[40px] gap-[48px] flex justify-between h-fit">
                        <div className="flex flex-col w-[60%]">
                            <Timeline
                                title="브리비트 성수"
                                time="12:00"
                                address="서울 성동구 왕십리로2길 30 1층"
                                price="평균 5000원"
                                tags={['감성 카페', '디저트 맛집']}
                                menu="카라멜 밀크"
                            />
                        </div>
                        <div className="border-[0.5px] border-default-gray-700 " />
                        <div className="flex flex-col w-[50%]">
                            <Info cashTag={''} locationTag={''} timeTag={''} MealTag={''} keywordTags={[]} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DateCourse;
