import LogoutSvg from '@/assets/icons/Logout_Blank.svg?react';

type TMobileSettingTab = {
    setActiveTab: (activeTab: '알람' | '멤버십' | '정보') => void;
    activeTab: '알람' | '멤버십' | '정보';
    handleLogout: () => void;
    logoutPending: boolean;
};
export default function MobileSettingTab({ setActiveTab, activeTab, handleLogout, logoutPending }: TMobileSettingTab) {
    return (
        <div className="sm:hidden max-w-full flex items-center gap-2 pr-4 overflow-x-scroll">
            {['알람', '멤버십', '정보'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as '알람' | '멤버십' | '정보')}
                    className={`w-fit whitespace-nowrap h-[35px] px-4 rounding-16 font-body1 text-left transition 
                ${activeTab === tab ? 'bg-primary-500 text-white' : 'bg-default-gray-400 text-default-gray-700'}`}
                >
                    {tab} 설정
                </button>
            ))}

            <button
                onClick={handleLogout}
                disabled={logoutPending}
                className={`bg-default-gray-400 text-default-gray-700 w-fit whitespace-nowrap h-[35px] px-4 rounding-16 font-body1 text-left transition flex flex-row gap-[5px] items-center justify-center}`}
            >
                <LogoutSvg className="w-4 h-4" fill="none" stroke="CurrentColor" />
                <span>{logoutPending ? '로그아웃 중...' : '로그아웃'}</span>
            </button>
        </div>
    );
}
