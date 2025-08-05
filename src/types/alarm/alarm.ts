import type { TCommonResponse } from '../common/common';

export type TRequestGetAlarm = {
    size?: number;
    cursor?: number;
};
export type TResponseGetAlarm = TCommonResponse<{
    alarmList: TAlarm[];
    size: number;
    hasNext: boolean;
    cursor: number | null;
}>;
export type TRequestPostDeviceToken = {
    deviceToken: string;
};
export type TResponsePOstDeviceToken = TCommonResponse<{}>;
export type TAlarm = {
    id: number;
    title: string;
    alarmType: string;
    isRead: boolean;
};
