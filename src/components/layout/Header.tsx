import { useState } from 'react';
import { Link } from 'react-router-dom';

import SettingsModal from '../modal/SettingModal';

import NotificationsIcon from '@/assets/icons/notifications_Blank.svg?react';
import SettingsIcon from '@/assets/icons/settings_Blank.svg?react';
import NavbarLogo from '@/assets/withTimeLogo/navbarLogo.svg?react';

export default function Header() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <header className="w-full border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-4">
                {/* 로고 */}
                <div className="flex items-center space-x-2">
                    <Link to="/home">
                        <NavbarLogo className="w-40 h-auto" />
                    </Link>
                </div>

                {/* 그룹 */}
                <div className="flex items-center gap-x-10 text-default-gray-00">
                    {/* 메뉴 */}
                    <nav>
                        <ul className="flex space-x-5 sm:space-x-10 text-sm font-medium">
                            <li>
                                <Link to="/home" className="font-body1">
                                    메인
                                </Link>
                            </li>
                            <li>
                                <Link to="/dateTest" className="font-body1">
                                    데이트 취향 테스트
                                </Link>
                            </li>
                            <li>
                                <Link to="/course" className="font-body1">
                                    데이트 코스
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* 아이콘 */}
                    <div className="hidden lg:flex items-center space-x-5">
                        {/* 알람 아이콘 */}
                        <Link to="/">
                            <NotificationsIcon className="w-5 h-5" fill="none" stroke="#000000" />
                        </Link>

                        {/* 설정 아이콘 */}
                        <button type="button" onClick={() => setIsSettingsOpen(true)}>
                            <SettingsIcon className="w-5 h-5" fill="none" stroke="#000000" />
                        </button>
                    </div>

                    {/* 설정 모달 */}
                    {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
                </div>
            </div>
        </header>
    );
}
