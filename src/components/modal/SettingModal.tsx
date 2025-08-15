import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/auth/useAuth';

import AlarmSetting from '@/components/settingTab/AlarmSetting';
import InfoSetting from '@/components/settingTab/InfoSetting';
import MembershipSetting from '@/components/settingTab/MembershipSetting';

import Modal from '../common/modal';
import MobileSettingTab from '../settingTab/mobileSettingTab';

import LogoutSvg from '@/assets/icons/Logout_Blank.svg?react';

interface ISettingsModalProps {
    onClose: () => void;
    defaultTab?: '알람' | '멤버십' | '정보';
}

export default function SettingsModal({ onClose, defaultTab = '알람' }: ISettingsModalProps) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'알람' | '멤버십' | '정보'>(defaultTab);
    const { useLogout } = useAuth();
    const { mutate: logoutMutate, isPending: logoutPending } = useLogout;

    const handleLogout = () => {
        logoutMutate(undefined, {
            onSuccess: () => {
                localStorage.clear();
                navigate('/');
            },
            onError: () => {
                alert('로그아웃 중 문제가 발생했어요.');
            },
        });
    };

    useEffect(() => setActiveTab(defaultTab), [defaultTab]);

    return (
        <Modal onClose={onClose} position="main" title="설정">
            <div className="sm:flex-row flex-col flex min-w-[300px]">
                <div className="w-[130px] sm:w-[170px] hidden sm:flex flex-col justify-between pr-4 sm:pr-6">
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

                    <button
                        onClick={handleLogout}
                        disabled={logoutPending}
                        className="font-body2 text-default-gray-800 cursor-pointer flex items-center space-x-2 mt-6 disabled:opacity-60"
                    >
                        <LogoutSvg className="w-4 h-4" fill="none" stroke="CurrentColor" />
                        <span>{logoutPending ? '로그아웃 중...' : '로그아웃'}</span>
                    </button>
                </div>
                <MobileSettingTab setActiveTab={setActiveTab} activeTab={activeTab} handleLogout={handleLogout} logoutPending={logoutPending} />
                <div className="flex-1 sm:pl-6 overflow-y-auto min-w-[300px]">
                    {activeTab === '알람' && <AlarmSetting />}
                    {activeTab === '멤버십' && <MembershipSetting />}
                    {activeTab === '정보' && <InfoSetting />}
                </div>
            </div>
        </Modal>
    );
}
