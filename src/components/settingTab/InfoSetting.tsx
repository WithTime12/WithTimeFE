import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAccount } from '@/hooks/auth/useAccount';
import { useUserEmail } from '@/hooks/auth/useEmail';

import EditableInputBox from '../common/EditableInputBox';
import PasswordEditSection from '../common/PasswordEdit';

import ChevronForward from '@/assets/icons/default_arrows/chevron_forward.svg?react';

export default function InfoSetting() {
    const [nickname, setNickname] = useState('');
    const [initialNickname, setInitialNickname] = useState('');

    const TERMS_URL = 'https://continuous-headphones-f4c.notion.site/1ece4447020b8049a727d11c3f853a46?source=copy_link';
    const PRIVACY_URL = 'https://www.notion.so/1ece4447020b80c8befcd2f3886a0350?source=copy_link';

    // 이메일(읽기 전용)
    const { email } = useUserEmail();

    // 닉네임/비밀번호 변경 훅
    const { useChangeNickname } = useAccount();

    const { mutate: changeNickname, isPending: nickPending } = useChangeNickname({
        onSuccess: (res) => {
            if (res.isSuccess) {
                setNickname(res.result.username);
                setInitialNickname(res.result.username);
                localStorage.setItem('nickname', res.result.username);
                alert('닉네임이 변경되었습니다.');
            } else {
                alert(res.message ?? '닉네임 변경에 실패했습니다.');
            }
        },
        onError: (err: any) => {
            const msg = err?.response?.data?.message ?? (err?.response?.status === 401 ? '로그인이 필요합니다.' : '닉네임 변경에 실패했습니다.');
            alert(msg);
        },
    });

    // 초기 닉네임 세팅
    useEffect(() => {
        const stored = localStorage.getItem('nickname');
        if (stored) {
            setNickname(stored);
            setInitialNickname(stored);
        }
    }, []);

    // 닉네임 저장
    const handleSubmitNickname = () => {
        if (nickname === initialNickname || nickPending) return;
        changeNickname({ username: nickname });
    };

    // 닉네임 취소
    const handleCancelNickname = () => setNickname(initialNickname);

    return (
        <div className="mt-5 flex flex-col items-start gap-5">
            {/* 닉네임 */}
            <EditableInputBox
                mode="nickname"
                label="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onCancel={handleCancelNickname}
                onSubmit={handleSubmitNickname}
            />

            {/* 이메일 (읽기 전용) */}
            <EditableInputBox label="이메일" value={email} readOnly onChange={() => {}} className="pointer-events-none" placeholder="이메일" />

            {/* 비밀번호 변경 섹션 */}
            <PasswordEditSection />

            <div className="w-full flex mt-6">
                <button
                    type="button"
                    onClick={() => alert('취향 데이터 초기화 기능은 준비 중입니다.')}
                    className="bg-primary-500 px-6 py-2 rounding-32 text-white font-body1"
                >
                    취향 데이터 초기화
                </button>
            </div>

            <div className="w-full max-w-[360px] mt-10 flex flex-col divide-y divide-default-gray-400">
                {/* 서비스 이용약관 - 노션페이지 */}
                <a
                    href={TERMS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between py-3 px-1 text-left font-body2 text-default-gray-800"
                >
                    서비스 이용약관
                    <ChevronForward width={20} height={20} fill="#000000" />
                </a>

                {/* 개인정보 처리방침 - 노션페이지 */}
                <a
                    href={PRIVACY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between py-3 px-1 text-left font-body2 text-default-gray-800"
                >
                    개인정보 처리방침
                    <ChevronForward width={20} height={20} fill="#000000" />
                </a>

                {/* 탈퇴하기 */}
                <Link to="/deleteAccount" className="w-full flex items-center justify-between py-3 px-1 text-left font-body2 text-default-gray-800">
                    탈퇴하기
                    <ChevronForward width={20} height={20} fill="#000000" />
                </Link>
            </div>
        </div>
    );
}
