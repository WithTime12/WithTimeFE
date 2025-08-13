import { useMemo } from 'react';
import { keepPreviousData } from '@tanstack/react-query';

import type { TFetchNoticeDetailResponse, TFetchNoticesResponse } from '@/types/notice/notice';

import { useCoreQuery } from '@/hooks/customQuery';

import { getNoticeDetail, getNotices, searchNotices } from '@/api/notice/notice';
import { noticeKeys } from '@/api/notice/notice.keys';

type TListParams = {
    category: 'SERVICE' | 'SYSTEM';
    page: number;
    size: number;
};

type TSearchParams = {
    keyword: string;
    page: number;
    size: number;
    category?: 'SERVICE' | 'SYSTEM';
};

export function useNotice() {
    // 공지 목록
    const useGetNotices = (params: TListParams, options?: Parameters<typeof useCoreQuery<TFetchNoticesResponse>>[2]) => {
        const stable = useMemo(() => params, [params.category, params.page, params.size]);

        return useCoreQuery<TFetchNoticesResponse>(noticeKeys.list(stable), () => getNotices(stable), {
            placeholderData: keepPreviousData,
            ...options,
        });
    };

    // 공지 상세
    const useGetNoticeDetail = (id: number, options?: Parameters<typeof useCoreQuery<TFetchNoticeDetailResponse>>[2]) =>
        useCoreQuery<TFetchNoticeDetailResponse>(noticeKeys.detail(id), () => getNoticeDetail(id), {
            enabled: Number.isFinite(id),
            ...options,
        });

    // 공지 검색
    const useSearchNotices = (params: TSearchParams, options?: Parameters<typeof useCoreQuery<TFetchNoticesResponse>>[2]) => {
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
