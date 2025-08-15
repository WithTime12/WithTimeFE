export const SigStorage = {
    key: 'signature',

    // 안전 파서: 문자열로 저장돼 있던 과거 값도 배열로 마이그레이션
    _parse(raw: string | null): string[] {
        if (raw == null) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [String(parsed)];
        } catch {
            return [raw]; // JSON이 아니면 과거 단일 문자열로 간주
        }
    },

    get(): string[] {
        try {
            return this._parse(localStorage.getItem(this.key));
        } catch {
            return [];
        }
    },

    append(sig: string) {
        if (!sig) return; // 빈값 방지
        try {
            const list = this.get();
            list.push(sig);
            localStorage.setItem(this.key, JSON.stringify(list));
            // 디버그 확인
            console.log('[SigStorage] after append:', localStorage.getItem(this.key));
        } catch (e) {
            console.error('[SigStorage] append failed:', e);
        }
    },

    appendUnique(sig: string) {
        if (!sig) return;
        try {
            const list = this.get();
            if (!list.includes(sig)) {
                list.push(sig);
                localStorage.setItem(this.key, JSON.stringify(list));
            }
            console.log('[SigStorage] after appendUnique:', localStorage.getItem(this.key));
        } catch (e) {
            console.error('[SigStorage] appendUnique failed:', e);
        }
    },
};
