import Cancle from '@/assets/icons/cancel.svg?react';
import Timmer from '@/assets/icons/timer_Blank.svg?react';

export default function PlaceButton({ placeName, onClick }: { placeName: string; onClick: () => void }) {
    return (
        <div className="flex gap-[16px] p-[8px] rounding-32 border-[1px] border-default-gray-800 items-center justify-center">
            <div className="flex font-body1 items-center justify-center text-center gap-[4px]">
                <Timmer stroke="#616161" />
                <div className="text-default-gray-700 mt-[4px]">{placeName}</div>
            </div>

            <Cancle stroke="#616161" onClick={onClick} />
        </div>
    );
}
