import { useState } from 'react';

import Modal from '../common/modal';
import DateCourseSearchFilterOption from '../dateCourse/dateCourseSearchFilterOption';

type TDateCourseSearchFilterModalProps = {
    onClose: () => void;
};
export default function DateCourseSearchFilterModal({ onClose }: TDateCourseSearchFilterModalProps) {
    const [budget, setBudget] = useState<undefined | string>();
    const [time, setTime] = useState<undefined | string>();
    const [meal, setMeal] = useState<string[] | undefined>([]);
    const [place, setPlace] = useState<string[] | undefined>([]);
    const [meet, setMeet] = useState<string | undefined>();
    const [keyword, setKeyword] = useState<string[] | undefined>();
    return (
        <Modal onClose={onClose}>
            <div className="flex w-[1000px] max-w-[80vw] flex-col px-[10%] gap-10">
                <DateCourseSearchFilterOption<string | undefined>
                    title={'예산 범위'}
                    subTitle="(1인당)"
                    options={['1만원 이하', '1~2만원', '2~3만원', '3만원 이상']}
                    state={budget}
                    setState={setBudget}
                    type="choice"
                />
                <DateCourseSearchFilterOption<string[] | undefined> type="search" title={'만날 장소'} state={place} setState={setPlace} />
                <DateCourseSearchFilterOption<string | undefined>
                    type="choice"
                    title={'데이트 시간'}
                    subTitle="(1개만 선택 가능)"
                    options={['1~2시간', '3~4시간', '반나절', '하루 종일']}
                    state={time}
                    setState={setTime}
                />
                <DateCourseSearchFilterOption<string[] | undefined>
                    type="choices"
                    title={'식사 구성'}
                    options={['아침', '점심', '저녁']}
                    state={meal}
                    setState={setMeal}
                />
                <DateCourseSearchFilterOption<string[] | undefined> type="keyword" title={'데이트 키워드'} state={keyword} setState={setKeyword} />
                <DateCourseSearchFilterOption<string | undefined> type="time" title={'만날 시간'} subTitle="(24:00 기준)" state={meet} setState={setMeet} />
            </div>
        </Modal>
    );
}
