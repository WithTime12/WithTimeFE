export const noticeKeys = {
    root: ['notice'] as const, // 루트 키

    // 목록 조회 키
    list: (p: { category: 'SERVICE' | 'SYSTEM'; page: number; size: number }) => [...noticeKeys.root, 'list', p] as const,

    // 상세 조회 키
    detail: (id: number) => [...noticeKeys.root, 'detail', id] as const,

    // 검색 조회 키
    search: (p: { keyword: string; page: number; size: number; category?: 'SERVICE' | 'SYSTEM' }) => [...noticeKeys.root, 'search', p] as const,
};
