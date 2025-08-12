import { useState } from 'react';
import { z } from 'zod';

import AlertCircle from '@/assets/icons/alert-circle_Fill.svg?react';

// 유효성 스키마
const passwordSchema = z.string().min(8, '8자 이상이어야 합니다.').max(32, '32자 이하로 입력해주세요.');

export default function PasswordEditSection() {
    // 상태 : 편집 여부
    const [isEditing, setIsEditing] = useState(false);

    // 상태 : 비밀번호 입력값
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    // 상태 : 각 필드별 에러 메시지
    const [errors, setErrors] = useState<{
        currentPw?: string;
        newPw?: string;
        confirmPw?: string;
    }>({});

    // 취소 버튼
    const handleCancel = () => {
        setCurrentPw('');
        setNewPw('');
        setConfirmPw('');
        setErrors({});
        setIsEditing(false);
    };

    // 저장하기 버튼
    const handleSubmit = () => {
        const newErrors: typeof errors = {};

        // 현재 비밀번호 검사
        if (!currentPw || currentPw.trim().length < 8) {
            newErrors.currentPw = '8자 이상이어야 합니다.';
        }

        // 새 비밀번호 검사
        const result = passwordSchema.safeParse(newPw);
        if (!result.success) {
            newErrors.newPw = result.error.errors[0].message;
        } else if (newPw === currentPw) {
            newErrors.newPw = '이전에 사용한 적이 없는 비밀번호여야 합니다.';
        }

        // 비밀번호 확인 일치
        if (newPw !== confirmPw) {
            newErrors.confirmPw = '비밀번호가 일치하지 않습니다';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setIsEditing(false);
        setErrors({});
    };

    // input 스타일
    const inputClass = (hasError: boolean) =>
        `w-full h-12 pl-4 pr-10 font-body1 text-black placeholder:text-default-gray-500 rounded-2xl border ${
            hasError ? 'border-warning' : 'border-primary-500'
        }`;

    return (
        <div className="w-full max-w-[360px]">
            {/* 헤더 - 비밀번호 / 취소 */}
            <div className="flex justify-between items-center mb-2">
                <p className="font-body1 text-default-gray-700">비밀번호</p>
                {isEditing && (
                    <button onClick={handleCancel} className="px-4 py-1.5 rounding-16 bg-default-gray-400 text-default-gray-700 font-body1">
                        취소
                    </button>
                )}
            </div>
            {/* 비편집 모드 - 현재 비밀번호 + 수정 */}
            {!isEditing ? (
                <div className="relative w-full">
                    <input
                        type="password"
                        value={currentPw}
                        readOnly
                        className="w-full h-12 pl-4 pr-20 border border-primary-500 rounded-[16px] font-body1 text-black bg-white"
                    />
                    <button
                        onClick={() => setIsEditing(true)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounding-32 font-body1 bg-default-gray-400 text-default-gray-700"
                    >
                        수정
                    </button>
                </div>
            ) : (
                // 편집 모드 - 현재/새/확인 비밀번호
                <div className="flex flex-col gap-4">
                    {/* 현재 비밀번호 */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="현재 비밀번호 입력"
                            value={currentPw}
                            onChange={(e) => setCurrentPw(e.target.value)}
                            className={inputClass(!!errors.currentPw)}
                        />
                        {errors.currentPw && (
                            <div className="absolute right-3 top-[20%]">
                                <AlertCircle className="w-[18px] h-[18px] text-warning" />
                            </div>
                        )}
                        {errors.currentPw && <p className="mt-1 text-sm text-warning pl-2">{errors.currentPw}</p>}
                    </div>

                    {/* 새 비밀번호 */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="새 비밀번호 입력"
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                            className={inputClass(!!errors.newPw)}
                        />
                        {errors.newPw && (
                            <div className="absolute right-3 top-[20%]">
                                <AlertCircle className="w-[18px] h-[18px] text-warning" />
                            </div>
                        )}
                        {errors.newPw && <p className="mt-1 text-sm text-warning pl-2">{errors.newPw}</p>}
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="새 비밀번호 확인"
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            className={inputClass(!!errors.confirmPw)}
                        />
                        {errors.confirmPw && (
                            <div className="absolute right-3 top-[20%]">
                                <AlertCircle className="w-[18px] h-[18px] text-warning" />
                            </div>
                        )}
                        {errors.confirmPw && <p className="mt-1 text-sm text-warning pl-2">{errors.confirmPw}</p>}
                    </div>

                    {/* 저장 버튼 */}
                    <div className="flex justify-end">
                        <button onClick={handleSubmit} className="mt-2 px-6 py-2 rounding-32 font-body1 bg-default-gray-400 text-default-gray-700">
                            저장하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
