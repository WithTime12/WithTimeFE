import { useCoreQuery } from '@/hooks/customQuery';

import { getDateTimeStates } from '@/api/home/dateTimes';
import { HomeKeys } from '@/queryKey/queryKey';

export const useDateTimeStates = () => {
    return useCoreQuery(HomeKeys.dateTimes().queryKey, () => getDateTimeStates(), { staleTime: 5 * 60 * 1000, gcTime: 15 * 60 * 1000, retry: 3 });
};
