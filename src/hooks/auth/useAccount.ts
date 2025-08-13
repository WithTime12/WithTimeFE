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

import { useCoreMutation } from '@/hooks/customQuery';

import { changeNickname, changePassword } from '@/api/auth/account';

export function useAccount() {
    // 비밀번호 변경
    function useChangePassword(options?: TChangePasswordMutationOptions): TChangePasswordMutationResult {
        return useCoreMutation<TChangePasswordResponse, TChangePasswordPayload>(changePassword, options);
    }

    // 닉네임 변경
    function useChangeNickname(options?: TChangeNicknameMutationOptions): TChangeNicknameMutationResult {
        return useCoreMutation<TChangeNicknameResponse, TChangeNicknamePayload>(changeNickname, options);
    }

    return { useChangePassword, useChangeNickname };
}
