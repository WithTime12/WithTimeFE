import { useCoreQuery } from '@/hooks/customQuery';

import { getDateTimeStates } from '@/api/home/dateTimes';
import { homeKeys } from '@/queryKey/queryKey';

export const useDateTimeStates = () => {
    return useCoreQuery(homeKeys.dateTimes().queryKey, () => getDateTimeStates(), { staleTime: 5 * 60 * 1000, gcTime: 15 * 60 * 1000, retry: 3 });
};
