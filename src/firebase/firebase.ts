// src/firebase/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

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
const messaging = getMessaging(app);

export const generateToken = async () => {
    const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    return token;
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
