import { Link } from 'react-router-dom';

import { MODAL_TYPES } from '../common/modalProvider';

import ClearIcon from '@/assets/icons/Clear.svg?react';
import NotificationsIcon from '@/assets/icons/notifications_Blank.svg?react';
import SettingsIcon from '@/assets/icons/settings_Blank.svg?react';
import useModalStore from '@/store/useModalStore';

interface IMobileMenuProps {
    onClose: () => void;
    onOpenSettings: () => void;
}

export default function MobileMenu({ onClose, onOpenSettings }: IMobileMenuProps) {
    const { openModal } = useModalStore();
    return (
        <>
            {/* 검정 반투명 배경 오버레이 */}
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

            {/* 사이드 메뉴 */}
            <div className="fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
                {/* 닫기 버튼 */}
                <div className="flex justify-end p-4">
                    <button onClick={onClose}>
                        <ClearIcon className="w-6 h-6 text-default-gray-800" />
                    </button>
                </div>

                {/* 메뉴 목록 */}
                <nav className="px-6">
                    <ul className="flex flex-col mt-5 gap-10 font-body1">
                        <li>
                            <Link to="/home" onClick={onClose}>
                                메인
                            </Link>
                        </li>
                        <li>
                            <Link to="/dateTest" onClick={onClose}>
                                데이트 취향 테스트
                            </Link>
                        </li>
                        <li>
                            <Link to="/dateCourse" onClick={onClose}>
                                데이트 코스
                            </Link>
                        </li>
                    </ul>

                    {/* 알림, 설정 */}
                    <div className="flex gap-5 mt-10">
                        <button
                            onClick={() => {
                                openModal(MODAL_TYPES.AlarmModal);
                                onClose();
                            }}
                        >
                            <NotificationsIcon className="w-5 h-5" fill="none" stroke="#000000" />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onOpenSettings();
                                onClose();
                            }}
                        >
                            <SettingsIcon className="w-5 h-5" fill="none" stroke="#000000" />
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
}
