import { useState } from 'react';

export default function PasswordEditSection() {
    const [isEditing, setIsEditing] = useState(false);

    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const handleCancel = () => {
        setCurrentPw('');
        setNewPw('');
        setConfirmPw('');
        setIsEditing(false);
    };

    const handleSubmit = () => {
        if (newPw !== confirmPw) {
            alert('새 비밀번호와 확인 값이 일치하지 않습니다.');
            return;
        }

        console.log('비밀번호 변경 요청:', { currentPw, newPw });
        setIsEditing(false);
    };

    return (
        <div className="w-full max-w-[360px]">
            <div className="flex justify-between items-center mb-2">
                <p className="font-body1 text-default-gray-700">비밀번호</p>
                {isEditing && (
                    <button onClick={handleCancel} className="px-4 py-1.5 rounding-16 bg-default-gray-400 text-default-gray-700 font-body1">
                        취소
                    </button>
                )}
            </div>

            {!isEditing ? (
                <div className="relative w-full">
                    <input
                        type="password"
                        value="********"
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
                <div className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="현재 비밀번호 입력"
                        value={currentPw}
                        onChange={(e) => setCurrentPw(e.target.value)}
                        className="w-full h-12 pl-4 pr-4 border border-primary-500 rounding-16 font-body1 text-black placeholder:text-default-gray-500"
                    />
                    <input
                        type="password"
                        placeholder="새 비밀번호 입력"
                        value={newPw}
                        onChange={(e) => setNewPw(e.target.value)}
                        className="w-full h-12 pl-4 pr-4 border border-primary-500 rounding-16 font-body1 text-black placeholder:text-default-gray-500"
                    />
                    <input
                        type="password"
                        placeholder="새 비밀번호 확인"
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        className="w-full h-12 pl-4 pr-4 border border-primary-500 rounding-16 font-body1 text-black placeholder:text-default-gray-500"
                    />
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
