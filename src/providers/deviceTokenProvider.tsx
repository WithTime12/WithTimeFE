// src/providers/DeviceTokenProvider.tsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { type QueryKey } from '@tanstack/react-query';
import { isSupported, onMessage } from 'firebase/messaging';

import { useFirebase } from '@/hooks/alarm/usePostDeviceToken';

import { queryClient } from '@/api/queryClient';
import { deleteFcmToken, generateToken, messaging, registerServiceWorker } from '@/firebase/firebase';

type TDeviceTokenContextValue = {
    token: string | null;
    supported: boolean | null;
    permission: NotificationPermission | null;
    requestAndRegister: () => Promise<void>;
    unregisterToken: () => Promise<void>;
};

const DeviceTokenContext = createContext<TDeviceTokenContextValue | null>(null);

type TProps = {
    children: React.ReactNode;
    refetchKeys?: QueryKey[];
    onForegroundMessage?: (payload: unknown) => void;
};

export function DeviceTokenProvider({ children, refetchKeys = [], onForegroundMessage }: TProps) {
    const qc = queryClient;
    const [token, setToken] = useState<string | null>(null);
    const [supported, setSupported] = useState<boolean | null>(null);
    const [permission, setPermission] = useState<NotificationPermission | null>(null);
    const messageUnsubRef = useRef<(() => void) | null>(null);
    const initOnceRef = useRef(false);
    const { postDeviceTokenMutation } = useFirebase();
    const { mutate: postDeviceToken } = postDeviceTokenMutation;
    useEffect(() => {
        (async () => {
            const ok = await isSupported().catch(() => false);
            setSupported(ok);
            setPermission(typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : null);
        })();
    }, []);

    const wireOnMessage = useCallback(() => {
        if (!messaging || messageUnsubRef.current) return;
        const unsub = onMessage(messaging, (payload) => {
            refetchKeys.forEach((key) => {
                qc.invalidateQueries({ queryKey: key });
            });
            onForegroundMessage?.(payload);
        });
        messageUnsubRef.current = unsub;
    }, [onForegroundMessage, qc, refetchKeys]);

    const requestAndRegister = useCallback(async () => {
        if (supported === false) {
            console.warn('FCM은 현재 브라우저에서 지원되지 않습니다.');
            return;
        }
        if (initOnceRef.current) return;
        initOnceRef.current = true;

        try {
            await registerServiceWorker();
            const newToken = await generateToken();
            setPermission(typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : null);

            if (newToken) {
                setToken(newToken);
                postDeviceToken(
                    { deviceToken: newToken },
                    {
                        onError: () => {
                            console.warn('FCM 토큰 등록 실패');
                            initOnceRef.current = false;
                        },
                        onSuccess: () => {
                            initOnceRef.current = true;
                        },
                    },
                );
                wireOnMessage();
            } else {
                console.warn('FCM 토큰 발급 실패 또는 권한 거부.');
                initOnceRef.current = false;
            }
        } catch (err) {
            console.error('FCM 초기화 실패:', err);
            initOnceRef.current = false;
        }
    }, [supported, wireOnMessage]);

    const unregisterToken = useCallback(async () => {
        try {
            await deleteFcmToken().catch(() => {});
        } finally {
            setToken(null);
            initOnceRef.current = false;
            messageUnsubRef.current?.();
            messageUnsubRef.current = null;
            for (const key of refetchKeys) qc.invalidateQueries({ queryKey: key });
        }
    }, [qc, refetchKeys]);

    useEffect(() => {
        return () => {
            messageUnsubRef.current?.();
            messageUnsubRef.current = null;
        };
    }, []);

    const value = useMemo(
        () => ({ token, supported, permission, requestAndRegister, unregisterToken }),
        [token, supported, permission, requestAndRegister, unregisterToken],
    );

    return <DeviceTokenContext.Provider value={value}>{children}</DeviceTokenContext.Provider>;
}

export function useDeviceTokenContext() {
    const ctx = useContext(DeviceTokenContext);
    if (!ctx) throw new Error('useDeviceTokenContext must be used within DeviceTokenProvider');
    return ctx;
}
