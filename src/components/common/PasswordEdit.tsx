import { useState } from 'react';
import { z } from 'zod';

import { useAccount } from '@/hooks/auth/useAccount';

import AlertCircle from '@/assets/icons/alert-circle_Fill.svg?react';

// 비밀번호 유효성 스키마
const passwordSchema = z.string().min(8, '8자 이상이어야 합니다.').max(32, '32자 이하로 입력해주세요.');

export default function PasswordEditSection() {
    const { useChangePassword } = useAccount();

    const [isEditing, setIsEditing] = useState(false);
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [errors, setErrors] = useState<{ currentPw?: string; newPw?: string; confirmPw?: string }>({});

    const MASK = '********';

    // 입력값 초기화
    const handleCancel = () => {
        setCurrentPw('');
        setNewPw('');
        setConfirmPw('');
        setErrors({});
        setIsEditing(false);
    };

    const { mutate: changePw, isPending } = useChangePassword();

    // 제출
    const handleSubmit = () => {
        const nextErrors: typeof errors = {};

        if (!currentPw) nextErrors.currentPw = '현재 비밀번호를 입력하세요.';

        const newPwCheck = passwordSchema.safeParse(newPw);
        if (!newPwCheck.success) {
            nextErrors.newPw = newPwCheck.error.issues[0]?.message ?? '유효하지 않은 비밀번호입니다.';
        }

        if (newPw !== confirmPw) {
            nextErrors.confirmPw = '비밀번호가 일치하지 않습니다.';
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        // 제출
        changePw(
            {
                currentPassword: currentPw,
                newPassword: newPw,
            },
            {
                onSuccess: () => {
                    alert('비밀번호가 변경되었습니다.');
                    handleCancel();
                },
                onError: (err: any) => {
                    const msg = (err as any)?.response?.data?.message ?? '비밀번호 변경에 실패했습니다.';
                    alert(msg);
                },
            },
        );
    };

    // 공통 인풋 스타일
    const inputClass = (hasError: boolean) =>
        `w-full h-12 pl-4 pr-10 font-body1 text-black placeholder:text-default-gray-500 rounded-2xl border ${
            hasError ? 'border-warning' : 'border-primary-500'
        }`;

    return (
        <div className="w-full max-w-[360px]">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-2">
                <p className="font-body1 text-default-gray-700">비밀번호</p>
                {isEditing && (
                    <button
                        onClick={handleCancel}
                        className="px-4 py-1.5 rounding-16 bg-default-gray-400 text-default-gray-700 font-body1 disabled:opacity-60"
                        disabled={isPending}
                    >
                        취소
                    </button>
                )}
            </div>

            {/* 비편집 모드 */}
            {!isEditing ? (
                <div className="relative w-full">
                    <input
                        type="password"
                        value={MASK}
                        readOnly
                        autoComplete="new-password"
                        className="w-full h-12 pl-4 pr-20 border border-primary-500 rounded-[16px] font-body1 text-black bg-white"
                    />
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounding-32 font-body1 bg-default-gray-400 text-default-gray-700"
                    >
                        수정
                    </button>
                </div>
            ) : (
                // 편집 모드
                <div className="flex flex-col gap-4">
                    {/* 현재 비밀번호 */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="현재 비밀번호 입력"
                            value={currentPw}
                            onChange={(e) => setCurrentPw(e.target.value)}
                            className={inputClass(!!errors.currentPw)}
                            disabled={isPending}
                        />
                        {errors.currentPw && (
                            <>
                                <div className="absolute right-3 top-[20%]">
                                    <AlertCircle className="w-[18px] h-[18px] text-warning" />
                                </div>
                                <p className="mt-1 text-sm text-warning pl-2">{errors.currentPw}</p>
                            </>
                        )}
                    </div>

                    {/* 새 비밀번호 */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="새 비밀번호 입력"
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                            className={inputClass(!!errors.newPw)}
                            disabled={isPending}
                        />
                        {errors.newPw && (
                            <>
                                <div className="absolute right-3 top-[20%]">
                                    <AlertCircle className="w-[18px] h-[18px] text-warning" />
                                </div>
                                <p className="mt-1 text-sm text-warning pl-2">{errors.newPw}</p>
                            </>
                        )}
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="새 비밀번호 확인"
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            className={inputClass(!!errors.confirmPw)}
                            disabled={isPending}
                        />
                        {errors.confirmPw && (
                            <>
                                <div className="absolute right-3 top-[20%]">
                                    <AlertCircle className="w-[18px] h-[18px] text-warning" />
                                </div>
                                <p className="mt-1 text-sm text-warning pl-2">{errors.confirmPw}</p>
                            </>
                        )}
                    </div>

                    {/* 저장 버튼 */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="mt-2 px-6 py-2 rounding-32 font-body1 bg-default-gray-400 text-default-gray-700 disabled:opacity-60"
                        >
                            {isPending ? '저장 중…' : '저장하기'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
