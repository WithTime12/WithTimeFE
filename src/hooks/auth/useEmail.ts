import { useEffect, useState } from 'react';

export function useUserEmail() {
    const [email, setEmail] = useState<string>(() => {
        try {
            return typeof window !== 'undefined' ? localStorage.getItem('userEmail') || '' : '';
        } catch {
            return '';
        }
    });

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'userEmail') setEmail(e.newValue || '');
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    return { email };
}
