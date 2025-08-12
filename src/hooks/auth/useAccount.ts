// src/hooks/auth/useAccount.ts
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

import { useCoreMutation, useCoreQuery } from '@/hooks/customQuery';

import { changeNickname, changePassword, deleteMember, getMemberInfo } from '@/api/auth/account';

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

    // 사용자 정보 가져오기
    function useGetMemberInfo() {
        return useCoreQuery(['memberInfo'], getMemberInfo);
    }

    return { useChangePassword, useChangeNickname, useDeleteMember, useGetMemberInfo };
}
