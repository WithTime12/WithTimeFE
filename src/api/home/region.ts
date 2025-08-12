import type { TPatchUserRegionRequest, TPatchUserRegionResponse } from '@/types/home/region';

import { axiosInstance } from '@/api/axiosInstance';

export const patchUserRegion = async ({ regionId }: TPatchUserRegionRequest): Promise<TPatchUserRegionResponse> => {
    const { data } = await axiosInstance.patch('/api/v1/regions/users', { regionId });
    return data;
};
