import type { TSearchRegionResponse, TSearchRegionValues } from '@/types/dateCourse';

import { axiosInstance } from '../axiosInstance';

export const searchRegion = async ({ keyword }: TSearchRegionValues): Promise<TSearchRegionResponse> => {
    const { data } = await axiosInstance.get('/api/v1/regions/search', {
        params: {
            keyword,
        },
    });
    return data;
};
