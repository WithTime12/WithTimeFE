import { useState } from 'react';

import AlarmSetting from '@/components/settingTab/AlarmSetting';
import InfoSetting from '@/components/settingTab/InfoSetting';
import MembershipSetting from '@/components/settingTab/MembershipSetting';

import GraySvgButton from '../common/graySvgButton';

import LogoutSvg from '@/assets/icons/Logout_Blank.svg?react';

export default function SettingsModal({ onClose }: { onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'알람' | '멤버십' | '정보'>('알람'); // 활성 탭 상태

    return (
        <div className="fixed top-0 left-0 z-[1000] w-screen h-screen bg-black/20 flex items-center justify-center">
            {/* 모달 본문 박스 */}
            <div className="bg-white w-[700px] max-h-[90vh] rounded-2xl shadow-lg p-8 relative flex">
                {/* 닫기 버튼 */}
                <div className="absolute top-4 right-4">
                    <GraySvgButton type="cancle" onClick={onClose} />
                </div>

                {/* 좌측 탭 메뉴 */}
                <div className="w-[170px] flex flex-col justify-between pr-6">
                    <div>
                        {/* 타이틀 */}
                        <p className="font-heading2 text-default-gray-800 mb-6">설정</p>

                        {/* 탭 목록 */}
                        <div className="flex flex-col space-y-3">
                            {['알람', '멤버십', '정보'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as '알람' | '멤버십' | '정보')}
                                    className={`w-full h-[35px] px-4 rounding-16 font-body1 text-left transition 
          ${activeTab === tab ? 'bg-primary-500 text-white' : 'bg-default-gray-400 text-default-gray-700'}`}
                                >
                                    {tab} 설정
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 로그아웃 */}
                    <div className="font-body2 text-default-gray-800 cursor-pointer flex items-center space-x-2 mt-6">
                        <LogoutSvg className="w-4 h-4" fill="none" stroke="CurrentColor" />
                        <span>로그아웃</span>
                    </div>
                </div>

                {/* 콘텐츠 영역 */}
                <div className="flex-1 pl-6 overflow-y-auto">
                    {activeTab === '알람' && <AlarmSetting />}
                    {activeTab === '멤버십' && <MembershipSetting />}
                    {activeTab === '정보' && <InfoSetting />}
                </div>
            </div>
        </div>
    );
}
