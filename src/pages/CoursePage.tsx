import DateCourse from '@/components/dateCourse/dateCourse';

import FileTray from '@/assets/icons/file_tray_empty_Fill.svg?react';
import Filter from '@/assets/icons/filter_Blank.svg?react';

export default function Course() {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex w-[1000px] max-w-[80vw] flex-col py-[24px] gap-[64px]">
                <div className="flex flex-col gap-[22px]">
                    <button className="bg-primary-500 py-[20px] rounding-16 text-default-gray-100 font-heading3">AI 기반 데이트 코스 만들기</button>
                    <button className="bg-primary-500 py-[20px] rounding-16 text-default-gray-100 font-heading3">직접 데이트 코스 찾아보기</button>
                </div>
                <div className="flex flex-col shadow-default rounding-16 px-[40px] py-[24px]">
                    <div className="flex w-full justify-between py-[24px]">
                        <div className="font-heading3">Madeleine 님만의 데이트 코스</div>
                        <div className="flex gap-[12px]">
                            <div className="px-[16px] py-[8px] rounding-16 flex gap-[2px] rounding-16 border-[1px] border-default-gray-700">
                                <FileTray />
                                저장된 장소 보기
                            </div>
                            <div className="px-[16px] py-[8px] rounding-16 flex rounding-16 border-[1px] border-default-gray-700">
                                <Filter stroke="#000000" />
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
