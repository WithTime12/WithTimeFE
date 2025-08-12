import type { TAlarmSettings, TGetAlarmSettingsResp, TPatchAlarmSettingsResp } from '@/types/settingAlarm/alarm';

import { axiosInstance } from '@/api/axiosInstance';

// 조회
export async function getAlarmSettings(): Promise<TGetAlarmSettingsResp> {
    const { data } = await axiosInstance.get<TGetAlarmSettingsResp>('/api/v1/alarms/settings');
    return data;
}

// 업데이트
export async function patchAlarmSettings(payload: TAlarmSettings): Promise<TPatchAlarmSettingsResp> {
    const { data } = await axiosInstance.patch<TPatchAlarmSettingsResp>('/api/v1/alarms/settings', payload);
    return data;
}
