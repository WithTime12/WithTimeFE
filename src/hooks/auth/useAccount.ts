import type {
    TChangeNicknameMutationOptions,
    TChangeNicknameMutationResult,
    TChangeNicknamePayload,
    TChangeNicknameResponse,
    TChangePasswordMutationOptions,
    TChangePasswordMutationResult,
    TChangePasswordPayload,
    TChangePasswordResponse,
} from '@/types/auth/account';
import type { TUseMutationCustomOptions } from '@/types/common/common';
import type { TResetPreferencesResponse } from '@/types/dates/preferences';

import { useCoreMutation, useCoreQuery } from '@/hooks/customQuery';

import { changeNickname, changePassword, deleteMember, getMemberGrade, getMemberInfo } from '@/api/auth/account';
import { resetPreferences } from '@/api/dates/preferences';

export function useAccount() {
    // 비밀번호 변경
    function useChangePassword(options?: TChangePasswordMutationOptions): TChangePasswordMutationResult {
        return useCoreMutation<TChangePasswordResponse, TChangePasswordPayload>(changePassword, options);
    }

    // 닉네임 변경
    function useChangeNickname(options?: TChangeNicknameMutationOptions): TChangeNicknameMutationResult {
        return useCoreMutation<TChangeNicknameResponse, TChangeNicknamePayload>(changeNickname, options);
    }

    // 회원 탈퇴
    function useDeleteMember(options?: TUseMutationCustomOptions<void, void>) {
        return useCoreMutation<void, void>(deleteMember, options);
    }

    // 사용자 정보 조회
    function useGetMemberInfo() {
        return useCoreQuery(['memberInfo'], getMemberInfo);
    }

    // 사용자 등급 조회
    function useGetMemberGrade() {
        return useCoreQuery(['memberGrade'], getMemberGrade);
    }

    // 취향 데이터 초기화
    function useResetPreferences(options?: TUseMutationCustomOptions<TResetPreferencesResponse, void>) {
        return useCoreMutation<TResetPreferencesResponse, void>(() => resetPreferences(), options);
    }

    return { useChangePassword, useChangeNickname, useDeleteMember, useGetMemberInfo, useGetMemberGrade, useResetPreferences };
}
