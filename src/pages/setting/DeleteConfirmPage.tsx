import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAccount } from '@/hooks/auth/useAccount';

import CommonAuthInput from '@/components/auth/commonAuthInput';
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
    const [checked, setChecked] = useState<boolean[]>(Array(withdrawAgreements.length).fill(false));

    // 회원정보 조회 + 탈퇴 훅
    const { useGetMemberInfo, useDeleteMember } = useAccount();

    // 사용자 정보 가져오기
    const { data: memberData, isLoading: infoLoading, isError: infoError } = useGetMemberInfo();
    const userEmail = memberData?.result?.email ?? ''; // ← 여기서 이메일 사용

    const { mutate: deleteAccount, isPending } = useDeleteMember();

    const allAgreed = checked.every(Boolean);

    const handleDelete = () => {
        if (!allAgreed) return alert('유의사항에 모두 동의해 주세요.');
        if (!confirm('정말 탈퇴하시겠습니까?')) return;
        deleteAccount(
            {},
            {
                onSuccess: () => {
                    alert('회원 탈퇴가 완료되었습니다.');
                    localStorage.removeItem('accessToken');
                    navigate('/', { replace: true });
                },
                onError: (error) => {
                    const msg = error?.response?.data?.message || '회원 탈퇴에 실패했습니다.';
                    alert(msg);
                },
            },
        );
    };

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

                    {/* 이메일 표시 */}
                    <CommonAuthInput
                        title="ID"
                        type="text"
                        value={infoLoading ? '불러오는 중…' : infoError ? '' : userEmail}
                        placeholder="이메일 주소"
                        readOnly
                    />

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

                    {/* 탈퇴하기 */}
                    <div className="mt-10 text-center">
                        <button
                            onClick={handleDelete}
                            disabled={!allAgreed || isPending}
                            className={`px-8 py-3 rounding-32 font-body1 text-white
                ${allAgreed && !isPending ? 'bg-primary-500 hover:bg-primary-600' : 'bg-default-gray-400 cursor-not-allowed'}`}
                        >
                            {isPending ? '처리 중…' : '탈퇴하기'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
