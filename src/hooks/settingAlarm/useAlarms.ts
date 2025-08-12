// hooks/settingAlarm/useAlarms.ts
import { useQueryClient } from '@tanstack/react-query';

import type { TAlarmSettings, TGetAlarmSettingsResp, TPatchAlarmSettingsResp } from '@/types/settingAlarm/alarm';

import { useCoreMutation, useCoreQuery } from '@/hooks/customQuery';

import { getAlarmSettings, patchAlarmSettings } from '@/api/settingAlarm/alarm';

// 조회
export function useGetAlarmSettings() {
    return useCoreQuery<TGetAlarmSettingsResp, TAlarmSettings>(['alarmSettings'], getAlarmSettings, {
        select: (resp) => resp.result,
        refetchOnWindowFocus: false,
    });
}

// 업데이트
export function usePatchAlarmSettings() {
    const qc = useQueryClient();
    return useCoreMutation<TPatchAlarmSettingsResp, TAlarmSettings>(patchAlarmSettings, {
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['alarmSettings'] });
        },
    });
}
