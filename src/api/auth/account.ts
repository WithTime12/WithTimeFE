import type { TChangeNicknamePayload, TChangeNicknameResponse, TChangePasswordPayload, TMemberInfo } from '@/types/auth/account';
import type { TCommonResponse } from '@/types/common/common';

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

// 탈퇴
export async function deleteMember(): Promise<void> {
    await axiosInstance.delete('/api/v1/members');
}

// 사용자 정보 조회
export async function getMemberInfo(): Promise<TCommonResponse<TMemberInfo>> {
    const { data } = await axiosInstance.get<TCommonResponse<TMemberInfo>>('/api/v1/members/infos');
    return data;
}
