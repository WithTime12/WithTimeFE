import { useEffect, useState } from 'react';

import { useGetAlarmSettings, usePatchAlarmSettings } from '@/hooks/settingAlarm/useAlarms';

import ToggleSwitch from '@/components/common/ToggleSwitch';

type TAlarmType = 'email' | 'push' | 'sms';

interface IAlarmSettingState {
    email: boolean;
    push: boolean;
    sms: boolean;
}

export default function AlarmSetting() {
    // 서버 데이터
    const { data: serverSettings } = useGetAlarmSettings();
    const { mutate: patchAlarm } = usePatchAlarmSettings();

    // 초기 값
    const [alarmSetting, setAlarmSetting] = useState<IAlarmSettingState>({
        email: true,
        push: true,
        sms: true,
    });

    // 서버 값 수신 -> UI 상태 매핑
    useEffect(() => {
        if (!serverSettings) return;
        setAlarmSetting({
            email: !!serverSettings.emailAlarm,
            push: !!serverSettings.pushAlarm,
            sms: !!serverSettings.smsAlarm,
        });
    }, [serverSettings]);

    // 토글 핸들러
    const handleToggle = (key: TAlarmType) => {
        const prev = alarmSetting;
        const next = { ...prev, [key]: !prev[key] };
        setAlarmSetting(next);

        patchAlarm(
            {
                emailAlarm: next.email,
                pushAlarm: next.push,
                smsAlarm: next.sms,
            },
            {
                onError: () => setAlarmSetting(prev),
            },
        );
    };

    const items: { label: string; key: TAlarmType }[] = [
        { label: 'Email 알람', key: 'email' },
        { label: '푸쉬 알람', key: 'push' },
        { label: 'SMS 알람', key: 'sms' },
    ];

    return (
        <div className="mt-5 flex flex-col gap-10 p-8">
            {items.map(({ label, key }) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 w-full">
                    <p className="font-heading3 text-default-gray-800 truncate overflow-hidden">{label}</p>
                    <ToggleSwitch value={alarmSetting[key]} onChange={() => handleToggle(key)} onLabel="ON" offLabel="OFF" />
                </div>
            ))}
        </div>
    );
}
