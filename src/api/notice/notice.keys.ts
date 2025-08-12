// React Query 캐시 키 관리 전용 파일

// 목록 쿼리 파라미터 타입
type TListParams = {
    category: 'SERVICE' | 'SYSTEM';
    page: number;
    size: number;
};

export const noticeKeys = {
    all: ['notices'] as const,
    // 목록 키 - 카테고리/페이지/사이즈별로 캐시 분리
    list: (params: TListParams) => [...noticeKeys.all, 'list', params.category, params.page, params.size] as const,

    // 상세 키 - ID별로 캐시 분리
    detail: (id: number) => [...noticeKeys.all, 'detail', id] as const,

    // 검색 키 - 개별 파라미터로 분리
    search: (keyword: string, page: number, size: number, category?: string) =>
        [...noticeKeys.all, 'search', keyword, page, size, ...(category ? [category] : [])] as const,
};
