import type { TCommonResponse } from './common/common';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}
export type TSignupValues = {
    email: string;
    username: string;
    password: string;
    gender: Gender;
    phoneNumber: string;
    birth: string;
};

export type TSignupResponse = TCommonResponse<{
    result: string;
}>;

export type TLoginValues = {
    email: string;
    password: string;
};

export type TLoginResponse = TCommonResponse<{
    result: string;
}>;

export type TRefreshResponse = TCommonResponse<{
    result: string;
}>;

export type TLogoutResponse = TCommonResponse<{
    result: string;
}>;
