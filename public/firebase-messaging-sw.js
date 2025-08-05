/// <reference lib="webworker" />
/* eslint-env serviceworker */
/* global firebase importScripts clients */
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: 'AIzaSyAjZqK2lhCOeX_P2Sf-_2IGEFlORchcO5w',
    authDomain: 'withtime-ff471.firebaseapp.com',
    projectId: 'withtime-ff471',
    storageBucket: 'withtime-ff471.firebasestorage.app',
    messagingSenderId: '47995224236',
    appId: '1:47995224236:web:85371605ce4a6659529f09',
    measurementId: 'G-5E8Q23LL4H',
});

const messaging = firebase.messaging();

self.addEventListener('push', function (event) {
    try {
        const payload = event.data.json();
        const title = payload.notification.title;

        const options = {
            body: payload.notification.body,
            icon: payload.notification.icon,
            data: payload.notification.click_action,
        };

        event.waitUntil(self.registration.showNotification(title, options));
    } catch (error) {
        console.error('Push event error:', error);
    }
});

self.addEventListener('notificationclick', function (event) {
    console.log(event.notification);

    event.notification.close();

    event.waitUntil(clients.openWindow(event.notification.data));
});
