// 뒤로 가기 시 SettingModal 띄우기 위한 페이지
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '@/components/layout/Header';
import SettingsModal from '@/components/modal/SettingModal';

export default function SettingEntryPage() {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [defaultTab, setDefaultTab] = useState<'알람' | '멤버십' | '정보'>('알람');

    useEffect(() => {
        const requestedTab = location.state?.openSettingTab;

        // 세 탭 중 하나인지 체크 후 적용
        if (['알람', '멤버십', '정보'].includes(requestedTab)) {
            setDefaultTab(requestedTab);
            setIsModalOpen(true);
        }
    }, [location.state]);

    return (
        <>
            <Header />
            {isModalOpen && <SettingsModal defaultTab={defaultTab} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
