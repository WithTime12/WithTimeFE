import { useState } from 'react';

import ToggleSwitch from '@/components/common/ToggleSwitch';

// 알람 타입 정의
type TAlarmType = 'email' | 'push' | 'sms';

// 알람 설정 상태 구조
interface IAlarmSettingState {
    email: boolean;
    push: boolean;
    sms: boolean;
}

export default function AlarmSetting() {
    // 상태 관리
    const [alarmSetting, setAlarmSetting] = useState<IAlarmSettingState>({
        email: true,
        push: true,
        sms: false,
    });

    // 토글 변경 핸들러 - 이전 값 기준으로 반전
    const handleToggle = (type: TAlarmType) => {
        setAlarmSetting((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    // UI 표시할 항목 배열
    const alarmItems: { label: string; key: TAlarmType }[] = [
        { label: 'Email 알람', key: 'email' },
        { label: '푸쉬 알람', key: 'push' },
        { label: 'SMS 알람', key: 'sms' },
    ];

    return (
        <div className="mt-5 flex flex-col gap-10 p-8">
            {alarmItems.map(({ label, key }) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 w-full">
                    {/* 텍스트 */}
                    <p className="font-heading3 text-default-gray-800 truncate overflow-hidden">{label}</p>

                    {/* 토글 */}
                    <ToggleSwitch value={alarmSetting[key]} onChange={() => handleToggle(key)} onLabel="ON" offLabel="OFF" />
                </div>
            ))}
        </div>
    );
}
