// hooks/settingAlarm/useAlarms.ts

import { useCoreMutation, useCoreQuery } from '@/hooks/customQuery';

import { getAlarmSettings, patchAlarmSettings } from '@/api/settingAlarm/alarm';
import { alarmKeys } from '@/queryKey/queryKey';

// 조회
export function useGetAlarmSettings() {
    return useCoreQuery(alarmKeys.alarmSettings().queryKey, getAlarmSettings, {
        select: (resp) => resp.result,
        refetchOnWindowFocus: false,
    });
}

// 업데이트
export function usePatchAlarmSettings() {
    return useCoreMutation(patchAlarmSettings);
}
