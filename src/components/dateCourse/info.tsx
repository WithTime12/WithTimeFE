import type { TInfo } from '@/types/dateCourse/dateCourse';
import { Budget, Meal, TotalTime } from '@/constants/dateCourseQuestion';

import InfoElement from './infoElement';

import Alarm from '@/assets/icons/Alarm_Blank.svg?react';
import Blub from '@/assets/icons/blub_Blank.svg?react';
import Cash from '@/assets/icons/cash_Blank.svg?react';
import Location from '@/assets/icons/Location_Blank.svg?react';
import Spoon from '@/assets/icons/spoon_Blank.svg?react';

type TBudgetKey = keyof typeof Budget;
type TTotalTimeKey = keyof typeof TotalTime;
type TMealKey = keyof typeof Meal;

const isBudgetKey = (v: string): v is TBudgetKey => Object.prototype.hasOwnProperty.call(Budget, v);
const isTotalTimeKey = (v: string): v is TTotalTimeKey => Object.prototype.hasOwnProperty.call(TotalTime, v);
const isMealKey = (v: string): v is TMealKey => Object.prototype.hasOwnProperty.call(Meal, v);
export default function Info({ cashTag, locationTag, timeTag, MealTag, keywordTags }: TInfo) {
    const label = isBudgetKey(cashTag) ? Budget[cashTag] : '알 수 없음';
    const totalTime = isTotalTimeKey(timeTag) ? TotalTime[timeTag] : '알 수 없음';
    const meals = MealTag.filter(isMealKey).map((tag) => Meal[tag]);

    return (
        <div className="w-full gap-[24px] flex flex-col">
            <InfoElement title="예산" tags={label}>
                <Cash stroke="#000000" />
            </InfoElement>
            <InfoElement title="장소" tags={locationTag}>
                <Location stroke="#000000" />
            </InfoElement>
            <InfoElement title="총 시간" tags={totalTime}>
                <Alarm stroke="#000000" />
            </InfoElement>

            <InfoElement title="식사 구성" tags={meals}>
                <Spoon fill="#000000" />
            </InfoElement>

            <InfoElement title="키워드" tags={keywordTags}>
                <Blub stroke="#000000" />
            </InfoElement>
        </div>
    );
}
