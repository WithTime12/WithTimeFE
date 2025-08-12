import { getMonthlyDatePlaceStates } from '../../api/home/datePlace';
import { useCoreQuery } from '../customQuery';

import { HomeKeys } from '@/queryKey/queryKey';

export const useMontlyPlaceStates = () => {
    return useCoreQuery(HomeKeys.montlyPlaceStates().queryKey, () => getMonthlyDatePlaceStates(), {
        staleTime: 5 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        retry: 3,
    });
};
