import { getDateTimeStats } from '../../api/home/dateTimes';
import { useCoreQuery } from '../customQuery';

import { HomeKeys } from '@/queryKey/queryKey';

export const useDateTimesStats = () => {
    return useCoreQuery(HomeKeys.dateTimes().queryKey, () => getDateTimeStats(), { staleTime: 5 * 60 * 1000, gcTime: 15 * 60 * 1000, retry: 3 });
};
