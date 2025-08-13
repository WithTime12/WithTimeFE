import type { TGetUserRegionResponse, TPatchUserRegionRequest, TPatchUserRegionResponse } from '@/types/home/region';

import { axiosInstance } from '@/api/axiosInstance';

export const patchUserRegion = async ({ regionId }: TPatchUserRegionRequest): Promise<TPatchUserRegionResponse> => {
    const { data } = await axiosInstance.patch('/api/v1/regions/users', { regionId });
    return data;
};

export const getUserRegion = async (): Promise<TGetUserRegionResponse> => {
    const { data } = await axiosInstance.get('/api/v1/regions/users/current');
    return data;
};
