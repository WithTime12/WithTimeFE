import { useState } from 'react';

import GraySvgButton from '../common/graySvgButton';

import LogoutSvg from '@/assets/icons/Logout_Blank.svg?react';

export default function SettingsModal({ onClose }: { onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'알림' | '멤버십' | '정보'>('알림');

    return (
        <div className="fixed top-0 left-0 z-[1000] w-screen h-screen bg-black/30 flex items-center justify-center">
            <div className="bg-white w-[500px] rounded-2xl shadow-lg p-6 relative">
                {/* 닫기 버튼 */}
                <div className="absolute top-4 right-4">
                    <GraySvgButton type="cancle" onClick={onClose} />
                </div>

                <h2 className="text-lg font-bold mb-4">설정</h2>

                {/* 탭 메뉴 */}
                <div className="flex space-x-2 mb-4">
                    {['알림', '멤버십', '정보'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as '알림' | '멤버십' | '정보')}
                            className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-mint text-white' : 'bg-gray-200 text-gray-500'}`}
                        >
                            {tab} 설정
                        </button>
                    ))}
                </div>

                {/* 탭 내용 */}
                <div className="min-h-[150px]">
                    {activeTab === '알림' && (
                        <div className="space-y-4">
                            <ToggleRow label="Email 알람" defaultChecked />
                            <ToggleRow label="푸쉬 알람" defaultChecked />
                            <ToggleRow label="SMS 알람" />
                        </div>
                    )}

                    {activeTab === '멤버십' && <div>💳 멤버십 설정 내용</div>}

                    {activeTab === '정보' && <div>👤 사용자 정보 설정 내용</div>}
                </div>

                {/* 하단 로그아웃 */}
                <div>
                    <LogoutSvg className="w-5 h-5 " />
                    <p className="mt-6 text-sm text-gray-500 cursor-pointer">로그아웃</p>
                </div>
            </div>
        </div>
    );
}

// 알림 토글 컴포넌트
function ToggleRow({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between">
            <span>{label}</span>
            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-mint rounded-full peer peer-focus:ring-2 transition duration-300" />
                <span className="ml-2 text-sm">{checked ? 'ON' : 'OFF'}</span>
            </label>
        </div>
    );
}
