import type { TMonthlyDatePlaceResponse } from '../../types/home/datePlace';
import { axiosInstance } from '../axiosInstance';

export const getMonthlyDatePlaceStates = async (): Promise<TMonthlyDatePlaceResponse> => {
    const { data } = await axiosInstance.get('/api/v1/logs/dateplaces/monthly');
    return data;
};
