import InfoElement from './infoElement';

import Alarm from '@/assets/icons/Alarm_Blank.svg?react';
import Blub from '@/assets/icons/blub_Blank.svg?react';
import Cash from '@/assets/icons/cash_Blank.svg?react';
import Location from '@/assets/icons/Location_Blank.svg?react';
import Spoon from '@/assets/icons/spoon_Blank.svg?react';

export default function Info() {
    return (
        <div className="w-full">
            <InfoElement title="예산" tags={['3만원 이상']}>
                <Cash stroke="#000000" />
            </InfoElement>

            <tr>
                <div className="w-[90px] flex">
                    <Location stroke="#000000" />
                    장소
                </div>
                <div>3만원 이상</div>
            </tr>
            <tr>
                <div className="w-[90px] flex">
                    <Alarm stroke="#000000" />총 시간
                </div>
                <div>3만원 이상</div>
            </tr>
            <tr>
                <div className="w-[90px] flex">
                    <Spoon fill="#000000" />
                    식사 구성
                </div>
                <div>3만원 이상</div>
            </tr>
            <tr>
                <div className="w-[90px] flex">
                    <Blub stroke="#000000" />
                    키워드
                </div>
                <div>3만원 이상</div>
            </tr>
        </div>
    );
}
