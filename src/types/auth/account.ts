import type { UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { TUseMutationCustomOptions } from '@/types/common/common';

export type TChangePasswordPayload = {
    currentPassword: string;
    newPassword: string;
};
export type TChangePasswordResponse = void;

export type TChangeNicknamePayload = { username: string };
export type TChangeNicknameResponse = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: { username: string };
};

// 비밀번호 변경 훅 타입
export type TChangePasswordMutationOptions = TUseMutationCustomOptions<TChangePasswordResponse, TChangePasswordPayload>;
export type TChangePasswordMutationResult = UseMutationResult<TChangePasswordResponse, AxiosError, TChangePasswordPayload>;

// 닉네임 변경 훅 타입
export type TChangeNicknameMutationOptions = TUseMutationCustomOptions<TChangeNicknameResponse, TChangeNicknamePayload>;
export type TChangeNicknameMutationResult = UseMutationResult<TChangeNicknameResponse, AxiosError, TChangeNicknamePayload>;

// 사용자 정보 타입
export type TMemberInfo = {
    id: number;
    email: string;
    username: string;
    userRank: string;
    phoneNumber: string;
    isAuthPayment: boolean;
    gender: string;
    birth: string;
    role: string;
    point: number;
};
