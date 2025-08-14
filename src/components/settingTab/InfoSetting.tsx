import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { TResponseError } from '@/types/common/common';
import { TERMS_URL } from '@/constants/policies';

import { useAccount } from '@/hooks/auth/useAccount';

import EditableInputBox from '../common/EditableInputBox';
import PasswordEditSection from '../common/PasswordEdit';

import { queryClient } from '@/api/queryClient';
import ChevronForward from '@/assets/icons/default_arrows/chevron_forward.svg?react';
import { memberKeys } from '@/queryKey/queryKey';

const getApiErrorMessage = (err: TResponseError, fallback: string) =>
    err?.response?.data?.message ?? (err?.response?.status === 401 ? '로그인이 필요합니다.' : fallback);

export default function InfoSetting() {
    const { useGetMemberInfo, useChangeNickname, useResetPreferences } = useAccount();

    const { data: memberData, isLoading: infoLoading, isError: infoError } = useGetMemberInfo();

    const email = memberData?.result?.email ?? '';
    const apiNickname = memberData?.result?.username ?? '';

    const [nickname, setNickname] = useState('');
    const [initialNickname, setInitialNickname] = useState('');

    useEffect(() => {
        if (apiNickname) {
            setNickname(apiNickname);
            setInitialNickname(apiNickname);
        }
    }, [apiNickname]);

    const { mutate: changeNickname, isPending: nickPending } = useChangeNickname();

    const { mutate: resetPref, isPending: resetPending } = useResetPreferences();

    const handleSubmitNickname = () => {
        const trimmed = nickname.trim();
        if (!trimmed) return alert('닉네임을 입력해 주세요.');
        if (trimmed === initialNickname || nickPending) return;
        changeNickname(
            { username: trimmed },
            {
                onSuccess: (res: any) => {
                    if (res?.isSuccess) {
                        const next = res.result.username;
                        setNickname(next);
                        setInitialNickname(next);
                        localStorage.setItem('nickname', next);

                        queryClient.invalidateQueries({ queryKey: memberKeys.all.queryKey });
                        queryClient.setQueryData(memberKeys.memberGrade().queryKey, (old: any) =>
                            old ? { ...old, result: { ...old.result, username: next } } : old,
                        );
                    } else {
                        alert(res?.message ?? '닉네임 변경에 실패했습니다.');
                    }
                },
                onError: (err: any) => alert(getApiErrorMessage(err, '닉네임 변경에 실패했습니다.')),
            },
        );
    };

    const handleCancelNickname = () => {
        setNickname(initialNickname);
    };

    const handleResetPreferences = () => {
        if (resetPending) return;
        if (!confirm('정말 초기화할까요? 되돌릴 수 없습니다.')) return;
        resetPref(undefined, {
            onSuccess: (res: any) => {
                if (res?.isSuccess) {
                    alert('취향 데이터가 초기화되었습니다.');
                } else {
                    alert(res?.message ?? '초기화에 실패했습니다.');
                }
            },
            onError: (err: any) => alert(getApiErrorMessage(err, '초기화에 실패했습니다.')),
        });
    };

    return (
        <div className="mt-5 flex flex-col items-start gap-5 p-5">
            {/* 닉네임 */}
            <EditableInputBox
                mode="nickname"
                label="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onCancel={handleCancelNickname}
                onSubmit={handleSubmitNickname}
                placeholder={infoLoading ? '불러오는 중' : initialNickname || '닉네임'}
                readOnly={infoLoading || nickPending}
            />

            {/* 이메일 */}
            <EditableInputBox
                label="이메일"
                value={infoLoading ? '불러오는 중' : infoError ? '' : email}
                readOnly
                onChange={() => {}}
                className="pointer-events-none"
                placeholder="이메일"
            />

            {/* 비밀번호 변경 */}
            <PasswordEditSection />

            {/* 취향 데이터 초기화 버튼 */}
            <div className="w-full flex mt-6">
                <button
                    type="button"
                    onClick={handleResetPreferences}
                    disabled={resetPending}
                    className={`bg-primary-500 px-6 py-2 rounding-32 text-white font-body1 ${resetPending ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    {resetPending ? '초기화 중…' : '취향 데이터 초기화'}
                </button>
            </div>

            <div className="w-full max-w-[360px] mt-10 flex flex-col divide-y divide-default-gray-400">
                <a
                    href={TERMS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between py-3 px-1 text-left font-body2 text-default-gray-800"
                >
                    서비스 이용약관
                    <ChevronForward width={20} height={20} fill="#000000" />
                </a>

                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        alert('해당 기능은 추후 제공 예정입니다.');
                    }}
                    className="w-full flex items-center justify-between py-3 px-1 text-left font-body2 text-default-gray-800"
                >
                    개인정보 처리방침
                    <ChevronForward width={20} height={20} fill="#000000" />
                </a>

                <Link to="/deleteAccount" className="w-full flex items-center justify-between py-3 px-1 text-left font-body2 text-default-gray-800">
                    탈퇴하기
                    <ChevronForward width={20} height={20} fill="#000000" />
                </Link>
            </div>
        </div>
    );
}
