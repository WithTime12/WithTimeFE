import type { TLoginResponse, TLoginValues, TLogoutResponse, TRefreshResponse, TSignupResponse, TSignupValues } from '@/types/auth';

import { axiosInstance } from '../axiosInstance';

export const defaultSignup = async ({ email, password, username, gender, phoneNumber, birth }: TSignupValues): Promise<TSignupResponse> => {
    const { data } = await axiosInstance.post('/auth/sign-up', { email, password, username, gender, phoneNumber, birth });
    return data;
};

export const defaultLogin = async ({ email, password }: TLoginValues): Promise<TLoginResponse> => {
    const { data } = await axiosInstance.post('/auth/login', { email, password });
    return data;
};

export const refresh = async (): Promise<TRefreshResponse> => {
    const { data } = await axiosInstance.post('/auth/reissue');
    return data;
};

export const logout = async (): Promise<TLogoutResponse> => {
    const { data } = await axiosInstance.post('/auth/logout');
    return data;
};
