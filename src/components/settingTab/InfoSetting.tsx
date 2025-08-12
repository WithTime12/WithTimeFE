import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import EditableInputBox from '../common/EditableInputBox';
import PasswordEditSection from '../common/PasswordEdit';

import ChevronForward from '@/assets/icons/default_arrows/chevron_forward.svg?react';

export default function InfoSetting() {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // 예시: 로컬에 저장된 이메일 가져옴
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    return (
        <div className="mt-5 flex flex-col items-start gap-5">
            {/* 닉네임 - 수정가능 */}
            <EditableInputBox
                mode="nickname"
                label="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onCancel={() => setNickname('')}
                onSubmit={() => {}}
            />
            {/* 이메일 - 수정 불가능 */}
            <EditableInputBox
                label="이메일"
                value={email}
                onChange={() => {}} // 읽기 전용
                className="pointer-events-none" // 수정도 불가능
                placeholder="이메일"
            />
            {/* 비밀번호 - 수정 가능 */}
            <PasswordEditSection />

            {/* 취향 초기화 버튼 */}
            <div className="w-full flex mt-6">
                <button className="bg-primary-500 px-6 py-2 rounding-32 text-white font-body1">취향 데이터 초기화</button>
            </div>

            {/* 기타 링크 */}
            <div className="w-full max-w-[360px] mt-10 flex flex-col divide-y divide-default-gray-400">
                <button className="w-full flex items-center justify-between py-3 px-1 text-left font-body2 text-default-gray-800">
                    서비스 이용약관
                    <ChevronForward width={20} height={20} fill="#000000" />
                </button>

                <button className="w-full flex items-center justify-between py-3 px-1 text-left font-body2 text-default-gray-800">
                    개인정보 처리방침
                    <ChevronForward width={20} height={20} fill="#000000" />
                </button>

                <Link to="/deleteAccount" className="w-full flex items-center justify-between py-3 px-1 text-left font-body2 text-default-gray-800">
                    탈퇴하기
                    <ChevronForward width={20} height={20} fill="#000000" />
                </Link>
            </div>
        </div>
    );
}
