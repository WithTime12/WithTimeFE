export type TAlarmSettings = {
    emailAlarm: boolean;
    pushAlarm: boolean;
    smsAlarm: boolean;
};

export type TApiEnvelope<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
};

export type TGetAlarmSettingsResp = TApiEnvelope<TAlarmSettings>;
export type TPatchAlarmSettingsResp = TApiEnvelope<TAlarmSettings>;
