import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import useDateCourseResultStore from '@/store/useDateCourseResultStore';

export function ClearOnLeave({ from, keys }: { from: string | RegExp; keys: string[] }) {
    const location = useLocation();
    const prev = useRef(location.pathname);
    const { resetDateCourseResultStore } = useDateCourseResultStore();
    useEffect(() => {
        const wasIn = typeof from === 'string' ? prev.current.startsWith(from) : (from as RegExp).test(prev.current);
        const nowIn = typeof from === 'string' ? location.pathname.startsWith(from) : (from as RegExp).test(location.pathname);

        if (wasIn && !nowIn) {
            keys.forEach((k) => localStorage.removeItem(k));
            resetDateCourseResultStore();
        }
        prev.current = location.pathname;
    }, [location.pathname, from, keys]);

    return null;
}
