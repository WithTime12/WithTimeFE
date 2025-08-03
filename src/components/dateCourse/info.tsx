import type { TInfo } from '@/types/dateCourse/dateCourse';

import InfoElement from './infoElement';

import Alarm from '@/assets/icons/Alarm_Blank.svg?react';
import Blub from '@/assets/icons/blub_Blank.svg?react';
import Cash from '@/assets/icons/cash_Blank.svg?react';
import Location from '@/assets/icons/Location_Blank.svg?react';
import Spoon from '@/assets/icons/spoon_Blank.svg?react';

export default function Info({ cashTag, locationTag, timeTag, MealTag, keywordTags }: TInfo) {
    return (
        <div className="w-full gap-[24px] flex flex-col">
            <InfoElement title="예산" tags={cashTag}>
                <Cash stroke="#000000" />
            </InfoElement>
            <InfoElement title="장소" tags={locationTag}>
                <Location stroke="#000000" />
            </InfoElement>
            <InfoElement title="총 시간" tags={timeTag}>
                <Alarm stroke="#000000" />
            </InfoElement>
            <InfoElement title="식사 구성" tags={MealTag}>
                <Spoon fill="#000000" />
            </InfoElement>
            <InfoElement title="키워드" tags={keywordTags}>
                <Blub stroke="#000000" />
            </InfoElement>
        </div>
    );
}
