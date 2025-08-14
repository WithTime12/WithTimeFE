// src/firebase/firebase.ts
import { initializeApp } from 'firebase/app';
import type { Messaging } from 'firebase/messaging';
import { deleteToken, getMessaging, getToken, isSupported } from 'firebase/messaging';

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
export let messaging: Messaging | null = null;
async function ensureMessaging() {
    if (!(await isSupported())) return null;
    if (!messaging) messaging = getMessaging(app);
    return messaging;
}
(async () => {
    if (await isSupported()) {
        messaging = getMessaging(app);
    }
})();

export async function generateToken(): Promise<string | null> {
    const m = await ensureMessaging();
    if (!m) return null;

    // 권한 요청 (이미 허용/거부된 상태면 브라우저가 적절히 동작)
    if ('Notification' in window && Notification.permission !== 'granted') {
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') return null;
    }

    try {
        const token = await getToken(m, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: await navigator.serviceWorker.ready,
        });
        return token ?? null;
    } catch (e) {
        console.error('FCM getToken 실패:', e);
        return null;
    }
}

export const registerServiceWorker = async () => {
    try {
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        }
    } catch (err) {
        console.error('Service Worker registration failed:', err);
    }
};

export async function deleteFcmToken(): Promise<boolean> {
    const m = await ensureMessaging();
    if (!m) return false;
    try {
        return await deleteToken(m);
    } catch (e) {
        console.error('FCM deleteToken 실패:', e);
        return false;
    }
}
