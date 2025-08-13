import type {
    TCheckEmailVerifications,
    TEmailVerfications,
    TFindPasswordResponse,
    TFindPasswordValues,
    TLoginResponse,
    TLoginValues,
    TLogoutResponse,
    TRefreshResponse,
    TSignupResponse,
    TSignupValues,
    TSocialLoginResponse,
    TSocialLoginValues,
} from '@/types/auth/auth';

import { axiosInstance } from '@/api/axiosInstance';

export const defaultSignup = async ({ email, password, username, gender, phoneNumber, birth, socialId }: TSignupValues): Promise<TSignupResponse> => {
    const { data } = await axiosInstance.post('/api/v1/auth/sign-up', { email, password, socialId, username, gender, phoneNumber, birth });
    return data;
};

export const defaultLogin = async ({ email, password }: TLoginValues): Promise<TLoginResponse> => {
    const { data } = await axiosInstance.post('/api/v1/auth/login', { email, password });
    return data;
};

export const refresh = async (): Promise<TRefreshResponse> => {
    const { data } = await axiosInstance.post('/api/v1/auth/reissue');
    return data;
};

export const logout = async (): Promise<TLogoutResponse> => {
    const { data } = await axiosInstance.post('/api/v1/auth/logout');
    return data;
};

export const emailVerifications = async ({ email }: { email: string }): Promise<TEmailVerfications> => {
    const { data } = await axiosInstance.post('/api/v1/auth/email-verifications', { email });
    return data;
};

export const checkEmailVerifications = async ({ email, code }: { email: string; code: string }): Promise<TCheckEmailVerifications> => {
    const { data } = await axiosInstance.post('/api/v1/auth/check-email-verifications', { email, code });
    return data;
};

export const socialLogin = async ({ platform, code }: TSocialLoginValues): Promise<TSocialLoginResponse> => {
    const { data } = await axiosInstance.get(`/api/v1/oauth2/callback/${platform}?code=${code}`);
    return data;
};

export const findPassword = async ({ email, newPassword }: TFindPasswordValues): Promise<TFindPasswordResponse> => {
    const { data } = await axiosInstance.post('/api/v1/auth/passwords', { email, newPassword });
    return data;
};
