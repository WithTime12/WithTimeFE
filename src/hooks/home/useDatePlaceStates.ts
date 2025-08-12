import { useCoreQuery } from '../customQuery';

import { getMonthlyDatePlaceStates } from '@/api/home/dateTimes';
import { HomeKeys } from '@/queryKey/queryKey';

export const useMonthlyPlaceStates = () => {
    return useCoreQuery(HomeKeys.monthlyPlaceStates().queryKey, () => getMonthlyDatePlaceStates(), {
        gcTime: 15 * 60 * 1000,
        retry: 3,
    });
};
