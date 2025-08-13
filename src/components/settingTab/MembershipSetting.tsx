import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ToggleSwitch from '../common/ToggleSwitch';

export default function MembershipSetting() {
    const [autoPay, setAutoPay] = useState(true);
    const navigate = useNavigate();

    const buttonClass =
        'w-full h-[38px] pl-[20px] rounded-[32px] border border-default-gray-500 text-default-gray-700 font-body2 text-left justify-start flex items-center bg-white';

    const buttons = [
        { label: '결제하기', path: '/' },
        { label: '환불하기', path: '/' },
        { label: '결제 내역 확인', path: '/paymentHistory' },
    ] as const;

    const blockedLabels = new Set<string>(['결제하기', '환불하기']);

    const handleClick = (label: string, path: string) => {
        if (blockedLabels.has(label)) {
            alert('해당 기능은 추후 제공 예정입니다.');
            return;
        }
        if (label === '결제 내역 확인') {
            navigate(path, { state: { openMembership: true } });
            return;
        }
        navigate(path);
    };

    return (
        <div className="mt-5 flex flex-col gap-4 p-6">
            <p className="font-heading3">
                현재 등급은 <span className="text-primary-700 font-heading2">Premium</span> 입니다.
            </p>
            <p className="font-body1 text-default-gray-700">다음 결제 예정일 : 2025.06.14</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-6">
                <p className="font-heading3 text-default-gray-800">자동 결제</p>
                <ToggleSwitch value={autoPay} onChange={setAutoPay} onLabel="ON" offLabel="OFF" />
            </div>
            <div className="flex flex-col gap-[10px] mt-6 w-full">
                {buttons.map(({ label, path }) => (
                    <button key={label} onClick={() => handleClick(label, path)} className={buttonClass}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
