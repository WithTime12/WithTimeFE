// hooks/settingAlarm/useAlarms.ts

import { useCoreMutation, useCoreQuery } from '@/hooks/customQuery';

import { getAlarmSettings, patchAlarmSettings } from '@/api/settingAlarm/alarm';

// 조회
export function useGetAlarmSettings() {
    return useCoreQuery(['alarmSettings'], getAlarmSettings, {
        select: (resp) => resp.result,
        refetchOnWindowFocus: false,
    });
}

// 업데이트
export function usePatchAlarmSettings() {
    return useCoreMutation(patchAlarmSettings);
}
