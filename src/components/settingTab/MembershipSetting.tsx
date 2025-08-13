import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAccount } from '@/hooks/auth/useAccount';

import ToggleSwitch from '../common/ToggleSwitch';

export default function MembershipSetting() {
    const [autoPay, setAutoPay] = useState(true);
    const navigate = useNavigate();

    // 등급 조회
    const { useGetMemberGrade } = useAccount();
    const { data: gradeData, isLoading, isError } = useGetMemberGrade();
    const gradeText = isLoading ? '불러오는 중' : isError ? '조회 실패' : (gradeData?.result?.grade ?? '등급 없음');

    // 버튼 공통 클래스
    const buttonClass =
        'w-full h-[38px] pl-[20px] rounded-[32px] border border-default-gray-500 text-default-gray-700 font-body2 text-left justify-start flex items-center bg-white';

    // 버튼 타입/데이터
    type TButton = {
        id: 'pay' | 'refund' | 'history';
        label: string;
        path: string;
        disabled?: boolean;
        state?: Record<string, unknown>;
    };

    const buttons: readonly TButton[] = [
        { id: 'pay', label: '결제하기', path: '/', disabled: true },
        { id: 'refund', label: '환불하기', path: '/', disabled: true },
        { id: 'history', label: '결제 내역 확인', path: '/paymentHistory', state: { openMembership: true } },
    ] as const;

    // 버튼 클릭 핸들러
    const handleClick = (btn: TButton) => {
        if (btn.disabled) {
            alert('해당 기능은 추후 제공 예정입니다.');
            return;
        }
        if (btn.state) {
            navigate(btn.path, { state: btn.state });
            return;
        }
        navigate(btn.path);
    };

    return (
        <div className="mt-5 flex flex-col gap-4 p-6">
            <p className="font-heading3">
                현재 등급은 <span className="text-primary-700 font-heading2">{gradeText}</span> 입니다.
            </p>

            <p className="font-body1 text-default-gray-700">다음 결제 예정일 : 2025.06.14</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-6">
                <p className="font-heading3 text-default-gray-800">자동 결제</p>
                <ToggleSwitch value={autoPay} onChange={setAutoPay} onLabel="ON" offLabel="OFF" />
            </div>

            <div className="flex flex-col gap-[10px] mt-6 w-full">
                {buttons.map((btn) => (
                    <button key={btn.id} onClick={() => handleClick(btn)} className={buttonClass}>
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
