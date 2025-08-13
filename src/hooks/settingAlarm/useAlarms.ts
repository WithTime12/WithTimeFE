import { useQueryClient } from '@tanstack/react-query';

import type { AlarmSettings, GetAlarmSettingsResp, PatchAlarmSettingsResp } from '@/types/settingAlarm/alarm';

import { useCoreMutation, useCoreQuery } from '@/hooks/customQuery';

import { getAlarmSettings, patchAlarmSettings } from '@/api/settingAlarm/alarm';

// 알림 설정 조회
export function useGetAlarmSettings() {
    return useCoreQuery(['alarmSettings'], getAlarmSettings, {
        select: (resp: GetAlarmSettingsResp) => resp.result,
        refetchOnWindowFocus: false,
    });
}

// 알림 설정 업데이트
export function usePatchAlarmSettings() {
    const qc = useQueryClient();
    return useCoreMutation<PatchAlarmSettingsResp, AlarmSettings>(patchAlarmSettings, {
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['alarmSettings'] });
        },
    });
}
