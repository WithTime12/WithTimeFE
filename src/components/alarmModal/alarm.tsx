import { useNavigate } from 'react-router-dom';

import type { TAlarm } from '@/types/alarm/alarm';

import ChevronForward from '@/assets/icons/default_arrows/chevron_forward.svg?react';

function Alarm({ title }: TAlarm) {
    const navigate = useNavigate();
    return (
        <div className="flex itmes-center justify-between w-full py-[24px] border-b-[2px] border-b-default-gray-400">
            <div className="text-default-gray-800 text-[22px] sm:w-[500px] w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
            <ChevronForward className="self-center" onClick={() => navigate('')} />
        </div>
    );
}

export default Alarm;
