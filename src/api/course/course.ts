import type { TSearchRegionResponse, TSearchRegionValues } from '@/types/dateCourse';

import { axiosInstance } from '../axiosInstance';

export const searchRegion = async ({ keyword }: TSearchRegionValues): Promise<TSearchRegionResponse> => {
    const { data } = await axiosInstance.post('/api/v1/regions/search', { keyword });
    return data;
};
