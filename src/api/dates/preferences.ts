import type { TResetPreferencesResponse } from '@/types/dates/preferences';

import { axiosInstance } from '../axiosInstance';

// 취향 데이터 초기화
export async function resetPreferences(): Promise<TResetPreferencesResponse> {
    const { data } = await axiosInstance.delete<TResetPreferencesResponse>('/api/v1/dates/preferences');
    return data;
}
