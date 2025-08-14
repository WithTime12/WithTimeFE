// hooks/faq/useFaq.ts
import { useMemo } from 'react';
import { keepPreviousData } from '@tanstack/react-query';

import type { TFaqCategory, TFetchFaqsResponse } from '@/types/faq/faq';

import { useCoreQuery } from '@/hooks/customQuery';

import { getFaqs, searchFaqs } from '@/api/faq/faq';
import { faqKeys } from '@/api/faq/faq.keys';

type TFaqListParams = { category: TFaqCategory; page: number; size: number };
type TFaqSearchParams = { keyword: string; category?: TFaqCategory; page: number; size: number };

//조회
export function useGetFaqs(params: TFaqListParams, options?: Parameters<typeof useCoreQuery<TFetchFaqsResponse>>[2]) {
    const stable = useMemo(() => params, [params.category, params.page, params.size]);

    return useCoreQuery<TFetchFaqsResponse>(faqKeys.list(stable), () => getFaqs(stable), {
        placeholderData: keepPreviousData,
        ...options,
    });
}

// 검색
export function useSearchFaqs(params: TFaqSearchParams, options?: Parameters<typeof useCoreQuery<TFetchFaqsResponse>>[2]) {
    const stable = useMemo(() => ({ ...params, keyword: params.keyword.trim() }), [params.keyword, params.category, params.page, params.size]);
    return useCoreQuery<TFetchFaqsResponse>(faqKeys.search(stable), () => searchFaqs(stable), {
        enabled: stable.keyword.length > 0,
        placeholderData: keepPreviousData,
        ...options,
    });
}
