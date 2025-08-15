import { useCoreMutation, useCoreQuery } from '../customQuery';

import { getUserRegion, patchUserRegion } from '@/api/home/region';
import { homeKeys } from '@/queryKey/queryKey';

export function useUserRegion() {
    return useCoreMutation(patchUserRegion);
}

export function useGetUserRegion() {
    return useCoreQuery(homeKeys.userRegion().queryKey, getUserRegion);
}
