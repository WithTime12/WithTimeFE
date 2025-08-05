// src/hooks/alarm/useDeviceToken.ts
import { useEffect } from 'react';
import { isSupported } from 'firebase/messaging';

import { postDeviceToken } from '@/api/alarm/alarm'; // 서버에 FCM 토큰 전송하는 API 함수
import { generateToken, registerServiceWorker } from '@/firebase/firebase';

export const useDeviceToken = () => {
    useEffect(() => {
        const setupFCM = async () => {
            if (!(await isSupported())) {
                console.warn('FCM은 현재 브라우저에서 지원되지 않습니다.');
                return;
            }

            await registerServiceWorker();
            const token = await generateToken();

            if (token) {
                try {
                    await postDeviceToken({ deviceToken: token }); // 서버에 전송
                } catch (err) {
                    console.error('디바이스 토큰 서버 전송 실패:', err);
                }
            }
        };

        const handleClick = () => {
            setupFCM();
            window.removeEventListener('click', handleClick);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);
};
