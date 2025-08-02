import { useState } from 'react';
import { Link } from 'react-router-dom';

import MobileMenu from './MobileMenu';
import SettingsModal from '../modal/SettingModal';

import BurgerIcon from '@/assets/icons/Burger_fill.svg?react';
import ClearIcon from '@/assets/icons/Clear.svg?react';
import NotificationsIcon from '@/assets/icons/notifications_Blank.svg?react';
import SettingsIcon from '@/assets/icons/settings_Blank.svg?react';
import NavbarLogo from '@/assets/withTimeLogo/navbarLogo.svg?react';

interface IHeaderProps {
    mode?: 'full' | 'minimal'; // full: nav + border | minimal: 로고만
}

export default function Header({ mode = 'full' }: IHeaderProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); //설정 모달
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴

    const showNav = mode === 'full';
    const showBorder = mode === 'full';

    return (
        <header className={`w-full ${showBorder ? 'border-b border-gray-200' : ''}`}>
            {/* 최상단 네브바 */}
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-4">
                {/* 로고 */}
                <Link to="/home">
                    <NavbarLogo className="w-40 h-auto" />
                </Link>

                {/* 데스크탑 메뉴 */}
                {showNav && (
                    <div className="hidden lg:flex items-center gap-x-10 text-default-gray-00">
                        {/* 네비게이션 링크들 */}
                        <nav>
                            <ul className="flex space-x-5 sm:space-x-10">
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
                                    <Link to="/dateCourse" className="font-body1">
                                        데이트 코스
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* 아이콘 버튼 */}
                        <div className="hidden lg:flex items-center space-x-5">
                            <Link to="/">
                                <NotificationsIcon className="w-5 h-5" fill="none" stroke="#000000" />
                            </Link>
                            <button type="button" onClick={() => setIsSettingsOpen(true)}>
                                <SettingsIcon className="w-5 h-5" fill="none" stroke="#000000" />
                            </button>
                        </div>
                    </div>
                )}

                {/* 모바일 메뉴 토글 버튼 */}
                {showNav && (
                    <div className="lg:hidden">
                        {!isMobileMenuOpen ? (
                            <button onClick={() => setIsMobileMenuOpen(true)}>
                                <BurgerIcon className="w-6 h-6 text-default-gray-800" />
                            </button>
                        ) : (
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <ClearIcon className="w-6 h-6 text-default-gray-800" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* 모바일 메뉴 */}
            {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} onOpenSettings={() => setIsSettingsOpen(true)} />}

            {/* 설정 모달 */}
            {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
        </header>
    );
}
