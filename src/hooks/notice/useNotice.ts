import { useMemo } from 'react';
import { keepPreviousData } from '@tanstack/react-query';

import type { TFetchNoticeDetailResponse, TFetchNoticesResponse } from '@/types/notice/notice';

import { useCoreQuery } from '@/hooks/customQuery';

import { getNoticeDetail, getNotices, searchNotices } from '@/api/notice/notice';
import { noticeKeys } from '@/api/notice/notice.keys';

// 목록 조회 시 넘길 파라미터 타입
type TListParams = {
    category: 'SERVICE' | 'SYSTEM';
    page: number;
    size: number;
};

// 검색 시 넘길 파라미터 타입
type TSearchParams = {
    keyword: string;
    page: number;
    size: number;
    category?: 'SERVICE' | 'SYSTEM';
};

export function useNotice() {
    // 공지 목록 조회 훅
    const useGetNotices = (params: TListParams, options?: Parameters<typeof useCoreQuery<TFetchNoticesResponse>>[2]) => {
        const stable = useMemo(
            () => ({
                category: params.category,
                page: params.page,
                size: params.size,
            }),
            [params.category, params.page, params.size],
        );

        return useCoreQuery<TFetchNoticesResponse>(noticeKeys.list(stable), () => getNotices(stable), {
            placeholderData: keepPreviousData,
            ...options,
        });
    };

    // 공지 상세
    const useGetNoticeDetail = (id: number, options?: Parameters<typeof useCoreQuery<TFetchNoticeDetailResponse>>[2]) =>
        useCoreQuery<TFetchNoticeDetailResponse>(noticeKeys.detail(id), () => getNoticeDetail(id), {
            enabled: Number.isFinite(id) && id > 0,
            ...options,
        });

    // 공지 검색
    const useSearchNotices = (params: TSearchParams, options?: Parameters<typeof useCoreQuery<TFetchNoticesResponse>>[2]) => {
        // keyword를 전처리하고, 파라미터 객체를 안정화
        const stable = useMemo(() => ({ ...params, keyword: params.keyword.trim() }), [params.keyword, params.page, params.size, params.category]);

        return useCoreQuery<TFetchNoticesResponse>(noticeKeys.search(stable), () => searchNotices(stable), {
            enabled: stable.keyword.length > 0,
            placeholderData: keepPreviousData,
            ...options,
        });
    };

    return {
        useGetNotices,
        useGetNoticeDetail,
        useSearchNotices,
    };
}
