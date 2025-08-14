import type {
    TChangeNicknameMutationOptions,
    TChangeNicknameMutationResult,
    TChangeNicknamePayload,
    TChangeNicknameResponse,
    TChangePasswordMutationOptions,
    TChangePasswordMutationResult,
    TChangePasswordPayload,
} from '@/types/auth/account';
import type { TResetPreferencesResponse } from '@/types/dates/preferences';

import { useCoreMutation, useCoreQuery } from '@/hooks/customQuery';

import { changeNickname, changePassword, deleteMember, getMemberGrade, getMemberInfo } from '@/api/auth/account';
import { resetPreferences } from '@/api/dates/preferences';

export const QUERY_KEYS = {
    memberInfo: ['memberInfo'] as const,
    memberGrade: ['memberGrade'] as const,
} as const;

export function useAccount() {
    // 비밀번호 변경
    function useChangePassword(options?: TChangePasswordMutationOptions): TChangePasswordMutationResult {
        return useCoreMutation<void, TChangePasswordPayload>(changePassword, options);
    }

    // 닉네임 변경
    function useChangeNickname(options?: TChangeNicknameMutationOptions): TChangeNicknameMutationResult {
        return useCoreMutation<TChangeNicknameResponse, TChangeNicknamePayload>(changeNickname, options);
    }

    // 회원 탈퇴
    function useDeleteMember() {
        return useCoreMutation(deleteMember);
    }

    // 사용자 정보 조회
    function useGetMemberInfo() {
        return useCoreQuery(QUERY_KEYS.memberInfo, getMemberInfo);
    }

    // 사용자 등급 조회
    function useGetMemberGrade() {
        return useCoreQuery(QUERY_KEYS.memberGrade, getMemberGrade);
    }

    // 취향 데이터 초기화
    function useResetPreferences() {
        return useCoreMutation<TResetPreferencesResponse, void>(resetPreferences);
    }

    return { useChangePassword, useChangeNickname, useDeleteMember, useGetMemberInfo, useGetMemberGrade, useResetPreferences };
}
