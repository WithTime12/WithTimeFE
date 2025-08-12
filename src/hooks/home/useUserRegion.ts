import { useCoreMutation, useCoreQuery } from '../customQuery';

import { getUserRegion, patchUserRegion } from '@/api/home/region';
import { HomeKeys } from '@/queryKey/queryKey';

export function useUserRegion() {
    return useCoreMutation(patchUserRegion);
}

export function useGetUserRegion() {
    return useCoreQuery(HomeKeys.userRegion().queryKey, getUserRegion);
}
