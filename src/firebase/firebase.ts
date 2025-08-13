// src/firebase/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyAjZqK2lhCOeX_P2Sf-_2IGEFlORchcO5w',
    authDomain: 'withtime-ff471.firebaseapp.com',
    projectId: 'withtime-ff471',
    storageBucket: 'withtime-ff471.firebasestorage.app',
    messagingSenderId: '47995224236',
    appId: '1:47995224236:web:85371605ce4a6659529f09',
    measurementId: 'G-5E8Q23LL4H',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
        if (!token) {
            console.warn('FCM 토큰 생성에 실패했습니다. 알림 권한을 확인해주세요.');
        }
        return token;
    } catch (error) {
        console.error('FCM 토큰 생성 중 오류 발생:', error);
        return null;
    }
};

export const registerServiceWorker = async () => {
    try {
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        }
    } catch (err) {
        console.error('Service Worker registration failed:', err);
    }
};
