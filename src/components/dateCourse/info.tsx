import InfoElement from './infoElement';

import Alarm from '@/assets/icons/Alarm_Blank.svg?react';
import Blub from '@/assets/icons/blub_Blank.svg?react';
import Cash from '@/assets/icons/cash_Blank.svg?react';
import Location from '@/assets/icons/Location_Blank.svg?react';
import Spoon from '@/assets/icons/spoon_Blank.svg?react';

type TInfo = {
    cashTag: string;
    locationTag: string;
    timeTag: string;
    MealTag: string;
    keywordTags: string[];
};

export default function Info({ cashTag, locationTag, timeTag, MealTag, keywordTags }: TInfo) {
    return (
        <div className="w-full gap-[24px] flex flex-col">
            <InfoElement title="예산" tags={['3만원 이상']}>
                <Cash stroke="#000000" />
            </InfoElement>
            <InfoElement title="장소" tags={['서울 성수동']}>
                <Location stroke="#000000" />
            </InfoElement>
            <InfoElement title="총 시간" tags={['3~4시간']}>
                <Alarm stroke="#000000" />
            </InfoElement>
            <InfoElement title="식사 구성" tags={['점심']}>
                <Spoon fill="#000000" />
            </InfoElement>
            <InfoElement title="키워드" tags={['감성카페', '디저트 맛집', '디저트 맛집', '로컬 푸드']}>
                <Blub stroke="#000000" />
            </InfoElement>
        </div>
    );
}
