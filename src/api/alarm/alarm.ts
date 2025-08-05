import type { TRequestGetAlarm, TRequestPostDeviceToken, TResponseGetAlarm, TResponsePostDeviceToken } from '@/types/alarm/alarm';

import { axiosInstance } from '../axiosInstance';

export const getAlarm = async ({ size = 5, cursor }: TRequestGetAlarm): Promise<TResponseGetAlarm> => {
    const { data } = await axiosInstance.get('/api/v1/alarms', {
        params: {
            size,
            cursor,
        },
    });
    return data;
};

export const postDeviceToken = async ({ deviceToken }: TRequestPostDeviceToken): Promise<TResponsePostDeviceToken> => {
    const { data } = await axiosInstance.post('/api/v1/alarms/device-tokens', { deviceToken });
    return data;
};
