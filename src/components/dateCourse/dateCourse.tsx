import { useState } from 'react';

import Info from './info';
import Timeline from './timeline';

import BookmarkBlank from '@/assets/icons/Bookmark_Blank.svg?react';
import KeyboardArrowDown from '@/assets/icons/keyboard_arrow_down_False.svg?react';
import More from '@/assets/icons/more_False.svg?react';

function DateCourse() {
    const [open, setOpen] = useState(false);

    const clickBookmark = () => {
        console.log('북마크 해제');
    };

    return (
        <div className="flex flex-col h-fit w-full min-w-[250px] self-center rounding-32 border-b-[1px] border-r-[1px] border-l-[1px] border-primary-700 bg-default-gray-100">
            <div
                className={`w-full rounding-32 flex border-primary-700 px-[24px] py-[16px] bg-default-gray-100 shadow-default z-2
              ${open ? 'border-[1px]' : 'border-t-[1px]'}
              `}
            >
                <div className="flex w-full justify-between items-center">
                    <div className="flex hover:cursor-pointer items-center" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowDown /> : <KeyboardArrowDown className="rotate-270" />}

                        <div className="text-default-gray-800 gap-[4px] select-none flex flex-col sm:flex-row pl-[4px]">
                            <span>2025.06.01</span> <span>데이트코스</span>
                        </div>
                    </div>
                    <div className="flex ">
                        <BookmarkBlank stroke="#212121" className="hover:cursor-pointer" onClick={clickBookmark} />
                        <More className="rotate-90 hover:cursor-pointer" fill="#212121" />
                    </div>
                </div>
            </div>
            {open && (
                <div className="w-full flex h-fit bg-default-gray-100 rounding-32 justify-center items-start self-stretch">
                    <div className="w-full lg:px-[48px] px-[24px] py-[40px] gap-[48px] flex justify-between h-fit lg:flex-row flex-col">
                        <div className="flex flex-col lg:w-[60%] gap-[16px]">
                            <Timeline
                                title="브리비트 성수"
                                time="12:00"
                                address="서울 성동구 왕십리로2길 30 1층"
                                price="평균 5000원"
                                tags={['감성 카페', '디저트 맛집']}
                                menu="카라멜 밀크"
                            />
                            <Timeline
                                title="라블랑 성수"
                                time="13:00"
                                address="서울 성동구 왕십리로2길 30 1층"
                                price="평균 5000원"
                                tags={['감성 카페', '디저트 맛집']}
                                menu="카라멜 밀크"
                            />
                            <Timeline end={true} time="14:00" />
                        </div>
                        <div className="border-[0.5px] border-default-gray-700 w-full lg:w-[1px]" />
                        <div className="flex flex-col lg:w-[50%]">
                            <Info
                                cashTag={'3만원 이상'}
                                locationTag={'서울 성수동'}
                                timeTag={'3~4시간'}
                                MealTag={'점심'}
                                keywordTags={[
                                    '감성 카페',
                                    '디저트 맛집',
                                    '디저트 맛집',
                                    '로컬 푸드',
                                    '감성 카페',
                                    '디저트',
                                    '감성',
                                    '디저트 맛집',
                                    '감성 카페',
                                    '디저트 맛집',
                                    '감성 카페',
                                    '디저트 맛집',
                                ]}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DateCourse;
