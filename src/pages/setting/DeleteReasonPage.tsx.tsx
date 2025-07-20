// 탈퇴 - 사유 선택
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ReasonButton from '@/components/common/ReansonButton';
import Header from '@/components/layout/Header';

import ArrowLeftCircle from '@/assets/icons/Arrow_left_circle.svg?react';

const reasons = ['서비스를 자주 이용하지 않아요.', '광고 알림이 너무 많아요.', '더 좋은 서비스가 있어요.', '기타'];

export default function DeleteReasonPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string[]>([]); // 배열로 변경

    const handleSelect = (reason: string) => {
        if (selected.includes(reason)) {
            setSelected(selected.filter((r) => r !== reason)); // 이미 선택된 경우 제거
        } else {
            setSelected([...selected, reason]); // 없으면 추가
        }
    };

    return (
        <>
            <Header mode="minimal" />

            <div className="flex items-center justify-center px-4 text-default-gray-800 font-body1">
                <div className="mt-15 w-full max-w-[530px]">
                    {/* 뒤로가기 */}
                    <div className="mb-5">
                        <button onClick={() => navigate('/setting', { state: { openSettingTab: '정보' } })}>
                            <ArrowLeftCircle className="fill-current text-default-gray-500" />
                        </button>
                    </div>

                    {/* 타이틀 */}
                    <h1 className="mb-10 font-heading3 text-center">탈퇴 사유를 선택해주세요</h1>

                    {/* 버튼 리스트 */}
                    <div className="flex flex-col gap-5">
                        {reasons.map((r) => (
                            <ReasonButton key={r} label={r} onClick={() => handleSelect(r)} isSelected={selected.includes(r)} />
                        ))}
                    </div>

                    {/* 다음 버튼 */}
                    <div className="mt-10 text-center">
                        <Link to="/deleteAccount/confirm" className="bg-primary-500 text-white px-20 py-3 rounding-16 font-body1">
                            다음
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
