// src/firebase/firebase.ts
import { initializeApp } from 'firebase/app';
import type { Messaging } from 'firebase/messaging';
import { deleteToken, getMessaging, getToken, isSupported } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export let messaging: Messaging | null = null;
(async () => {
    if (await isSupported()) {
        messaging = getMessaging(app);
    }
})();

export async function generateToken(): Promise<string | null> {
    if (!(await isSupported())) return null;
    if (!messaging) messaging = getMessaging(app);

    // 권한 요청 (이미 허용/거부된 상태면 브라우저가 적절히 동작)
    if ('Notification' in window && Notification.permission !== 'granted') {
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') return null;
    }

    try {
        const token = await getToken(messaging, {
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
    if (!(await isSupported())) return false;
    if (!messaging) messaging = getMessaging(app);
    try {
        return await deleteToken(messaging);
    } catch (e) {
        console.error('FCM deleteToken 실패:', e);
        return false;
    }
}
