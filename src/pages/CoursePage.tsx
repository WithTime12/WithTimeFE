import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MODAL_TYPES } from '@/components/common/modalProvider';
import Navigator from '@/components/common/navigator';
import DateCourse from '@/components/dateCourse/dateCourse';

import FileTray from '@/assets/icons/file_tray_empty_Fill.svg?react';
import Filter from '@/assets/icons/filter_Blank.svg?react';
import useModalStore from '@/store/useModalStore';

export default function Course() {
    const navigate = useNavigate();
    const { openModal } = useModalStore();
    const [current, setCurrent] = useState(1);
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex w-[1000px] max-w-[80vw] flex-col py-[24px] gap-[64px]">
                <div className="flex flex-col gap-[22px]">
                    <button className="bg-primary-500 py-[20px] rounding-16 text-default-gray-100 font-heading3" onClick={() => navigate('/makeCourse')}>
                        AI 기반 데이트 코스 만들기
                    </button>
                    <button className="bg-primary-500 py-[20px] rounding-16 text-default-gray-100 font-heading3" onClick={() => navigate('/findCourse')}>
                        직접 데이트 코스 찾아보기
                    </button>
                </div>
                <div className="flex flex-col shadow-default rounding-16 px-[10px] sm:px-[40px] py-[24px]">
                    <div className="flex w-full justify-between py-[24px] gap-[12px] lg:flex-row flex-col">
                        <div className="font-heading3 sm:w-fit w-full text-center justify-center">Madeleine 님만의 데이트 코스</div>
                        <div className="flex gap-[12px] justify-center items-center sm:justify-end flex-col sm:flex-row">
                            <div className="px-[16px] py-[8px] text-body2 rounding-16 flex gap-[4px] w-fit rounding-16 border-[1px] border-default-gray-700  text-default-gray-700">
                                <FileTray fill="#616161" />
                                저장된 코스 보기
                            </div>
                            <div
                                className="px-[16px] py-[8px] gap-[4px] text-body2 rounding-16 flex rounding-16 w-fit border-[1px] border-default-gray-700  text-default-gray-700"
                                onClick={() => openModal({ modalType: MODAL_TYPES.DateCourseSearchFilterModal })}
                            >
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
                    <Navigator current={current} end={14} onClick={setCurrent} />
                </div>
            </div>
        </div>
    );
}
