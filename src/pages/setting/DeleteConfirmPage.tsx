import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CommonAuthInput from '@/components/common/commonAuthInput';
import Header from '@/components/layout/Header';

import ArrowLeftCircle from '@/assets/icons/Arrow_left_circle.svg?react';

// 탈퇴 안내 배열
const withdrawNotices = [
    '탈퇴 시 해당 계정으로 모든 서비스를 이용할 수 없습니다.',
    '계정이 삭제된 이후에는 복구할 수 없습니다.',
    '탈퇴 즉시, 같은 계정으로 7일동안 다시 가입할 수 없습니다.\n    만약 이용 약관에 따라 회원 자격을 제한 또는 정지당한 회원이 그 조치 기간에 탈퇴하는\n경우에는 해당 조치 기간 동안은 다시 가입할 수 없습니다.',
    '데이트 코스 후기, 취향 데이터 등 활동한 내역이 모두 삭제되며, 복구할 수 없습니다.',
    '보유하고 계신 멤버십이 모두 소멸되며, 복구할 수 없습니다.',
];

// 체크박스 문구 배열
const withdrawAgreements = [
    '유의 사항을 모두 확인하였으며,\n회원 탈퇴시 보유한 멤버십이 소멸되는 것에 동의합니다.',
    '계정은 탈퇴 후 복구할 수 없으며, 이에 동의합니다.',
];

export default function DeleteConfirmPage() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [checked, setChecked] = useState<boolean[]>(Array(withdrawAgreements.length).fill(false));

    // 사용자 이메일 localStorage에서 가져오기
    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    // 체크박스 토글
    const toggleCheckbox = (index: number) => {
        const updated = [...checked];
        updated[index] = !updated[index];
        setChecked(updated);
    };

    return (
        <>
            <Header mode="minimal" />
            <div className="flex items-center justify-center px-4 text-default-gray-800 font-body1">
                <div className="mt-15 w-full max-w-[530px]">
                    {/* 뒤로가기 */}
                    <div className="mb-5">
                        <button onClick={() => navigate(-1)}>
                            <ArrowLeftCircle className="fill-current text-default-gray-500" />
                        </button>
                    </div>

                    {/* 타이틀 */}
                    <h1 className="mb-5 font-heading3 text-center">회원 탈퇴 전 아래 유의사항을 확인해주세요</h1>

                    {/* 아이디 */}
                    <CommonAuthInput title="ID" type="text" value={userEmail} placeholder="이메일 주소" readOnly />

                    {/* 탈퇴 설명 */}
                    <div className="mt-5 border rounded-md p-4 font-body2 text-default-gray-700 leading-relaxed">
                        <ul className="list-disc list-outside pl-5 space-y-2 marker:text-default-gray-700 text-default-gray-700 text-sm leading-relaxed">
                            {withdrawNotices.map((notice, idx) => (
                                <li key={idx} className="whitespace-pre-line">
                                    {notice}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 체크박스 */}
                    <div className="mt-10 flex flex-col gap-4">
                        {withdrawAgreements.map((text, idx) => (
                            <label key={idx} className="flex items-start gap-2 font-body1 leading-tight text-default-gray-800">
                                <input type="checkbox" checked={checked[idx]} onChange={() => toggleCheckbox(idx)} className="mt-1" />
                                <span>
                                    {text.split('\n').map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* 탈퇴 버튼 */}
                    <div className="mt-10 text-center">
                        <button className="bg-primary-500 text-white px-8 py-3 rounding-32 font-body1">탈퇴하기</button>
                    </div>
                </div>
            </div>
        </>
    );
}
