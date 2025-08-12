import type { TChangeNicknamePayload, TChangeNicknameResponse, TChangePasswordPayload } from '@/types/auth/account';

import { axiosInstance } from '@/api/axiosInstance';

// 비밀번호 변경
export async function changePassword(payload: TChangePasswordPayload): Promise<void> {
    const body = { nowPassword: payload.currentPassword, newPassword: payload.newPassword };
    await axiosInstance.patch('/api/v1/members/passwords', body);
}

// 닉네임 변경
export async function changeNickname(payload: TChangeNicknamePayload): Promise<TChangeNicknameResponse> {
    const { data } = await axiosInstance.patch<TChangeNicknameResponse>('/api/v1/members/infos', payload);
    return data;
}
