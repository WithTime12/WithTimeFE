import DateCourse from '@/components/dateCourse/dateCourse';

import Filter from '@/assets/icons/filter_Blank.svg?react';

function FindDateCourse() {
    return (
        <div className="w-full flex justify-center items-center flex-col h-[100%]">
            <div className="flex w-[1000px] max-w-[80vw] flex-col py-[24px] gap-[64px]">
                <div className="flex flex-col shadow-default rounding-16 px-[40px] py-[24px]">
                    <div className="flex w-full justify-between py-[24px]">
                        <div className="font-heading3 select-none">Madeleine 님만의 데이트 코스</div>
                        <div className="flex">
                            <div className="px-[16px] select-none py-[8px] rounding-16 flex rounding-16 border-[1px] border-default-gray-700 text-default-gray-700">
                                <Filter stroke="#616161" />
                                검색 필터
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[24px] ">
                        <DateCourse />
                        <DateCourse />
                        <DateCourse />
                        <DateCourse />
                        <DateCourse />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindDateCourse;
