import type { TCommonResponse } from './common/common';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}
export type TSignupValues = {
    email: string;
    username: string;
    password?: string | null;
    gender: Gender;
    phoneNumber: string;
    birth: string;
    socialId?: number;
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

export type TEmailVerfications = TCommonResponse<{
    result: string;
}>;
export type TCheckEmailVerifications = TCommonResponse<{
    result: string;
}>;
export type TSocialLoginResponse = TCommonResponse<{
    email: string;
    socialId: number;
    isFirst: boolean;
}>;
export enum TSocialLoginPlatform {
    kakao = 'kakao',
    naver = 'naver',
    google = 'google',
}
export type TSocialLoginValues = {
    platform: TSocialLoginPlatform;
    code: string;
};

export type TFindPasswordValues = {
    email: string;
    newPassword: string;
};

export type TFindPasswordResponse = TCommonResponse<{
    result: string;
}>;
