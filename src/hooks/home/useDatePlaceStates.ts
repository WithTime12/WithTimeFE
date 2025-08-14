import { useCoreQuery } from '../customQuery';

import { getMonthlyDatePlaceStates } from '@/api/home/dateTimes';
import { homeKeys } from '@/queryKey/queryKey';

export const useMonthlyPlaceStates = () => {
    return useCoreQuery(homeKeys.monthlyPlaceStates().queryKey, () => getMonthlyDatePlaceStates(), {
        gcTime: 15 * 60 * 1000,
        retry: 3,
    });
};
