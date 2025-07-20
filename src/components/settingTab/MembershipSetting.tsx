import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ToggleSwitch from '../common/ToggleSwitch';

export default function MembershipSetting() {
    const [autoPay, setAutoPay] = useState(true);
    const navigate = useNavigate();

    // 버튼 공통 디자인
    const buttonClass =
        'w-[255px] h-[38px] pl-[24px] rounding-32 border border-default-gray-500 text-default-gray-700 font-body2 text-left justify-start flex items-center bg-white';

    // 버튼 목록
    const buttons = [
        { label: '결제하기', path: '/payment' }, //연결 필요
        { label: '환불하기', path: '/' }, //연결 필요
        { label: '결제 내역 확인', path: '/paymentHistory' },
    ];

    // 뒤로 가기 버튼
    const handleClick = (label: string, path: string) => {
        if (label === '결제 내역 확인') {
            navigate(path, { state: { openMembership: true } });
        } else {
            navigate(path);
        }
    };

    return (
        <div className="mt-15 flex flex-col gap-4 p-6">
            {/* 등급 */}
            <p className="font-heading3">
                현재 등급은 <span className="text-primary-700 font-heading2">Premium</span> 입니다.
            </p>

            {/* 결제 예정일 */}
            <p className="font-body1 text-default-gray-700">다음 결제 예정일 : 2025.06.14</p>

            {/* 자동 결제 토글 */}
            <div className="flex items-center gap-5 mt-6">
                <p className="font-heading3 text-default-gray-800">자동 결제</p>
                <ToggleSwitch value={autoPay} onChange={setAutoPay} onLabel="ON" offLabel="OFF" />
            </div>

            {/* 버튼 */}
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
