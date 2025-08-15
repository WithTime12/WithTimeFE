// src/app/RouteScopeReset.tsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import useFilterStore from '@/store/useFilterStore';

const SCOPES = ['/makeCourse', '/dateCourse', '/findCourse'] as const;
type TScope = (typeof SCOPES)[number] | null;

function getScope(pathname: string): TScope {
    // '/makeCourse' 또는 '/makeCourse/...' 형태 매칭
    const hit = SCOPES.find((s) => pathname === s || pathname.startsWith(s + '/'));
    return hit ?? null;
}

export default function RouteScopeReset() {
    const { pathname } = useLocation();
    const reset = useFilterStore((s) => s.reset);
    const prevScopeRef = useRef<TScope>(getScope(pathname));

    useEffect(() => {
        const nowScope = getScope(pathname);
        if (prevScopeRef.current !== nowScope) {
            // 스코프가 바뀌는 순간(스코프 밖↔안, 스코프 A↔B)만 초기화
            reset();
            prevScopeRef.current = nowScope;
        }
    }, [pathname, reset]);

    return null;
}
