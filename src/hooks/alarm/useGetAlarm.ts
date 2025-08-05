import { useInfiniteQuery } from '@tanstack/react-query';

import type { TRequestGetAlarm } from '@/types/alarm/alarm';

import { getAlarm } from '@/api/alarm/alarm';
import { alarmKeys } from '@/queryKey/queryKey';

export const useGetAlarm = ({ cursor, size }: TRequestGetAlarm) => {
    return useInfiniteQuery({
        queryKey: alarmKeys.getAlarm(cursor, size).queryKey,
        queryFn: ({ pageParam = cursor }) => getAlarm({ cursor: pageParam, size }),
        initialPageParam: cursor,
        getNextPageParam: (lastPage) => lastPage.result.cursor ?? undefined,
    });
};
