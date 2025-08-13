import type { TFaqCategory, TFetchFaqsResponse } from '@/types/faq/faq';

import { axiosInstance } from '@/api/axiosInstance';

// FAQ 목록 조회
export const getFaqs = async (params: { category: TFaqCategory; page: number; size: number }) => {
    const { data } = await axiosInstance.get<TFetchFaqsResponse>('/api/v1/faqs', {
        params: {
            faqCategory: params.category,
            page: params.page,
            size: params.size,
        },
    });
    return data;
};

// FAQ 검색
export const searchFaqs = async (params: { keyword: string; category?: TFaqCategory; page: number; size: number }) => {
    const { data } = await axiosInstance.get<TFetchFaqsResponse>('/api/v1/faqs/search', {
        params: {
            keyword: params.keyword,
            faqCategory: params.category,
            page: params.page,
            size: params.size,
        },
    });
    return data;
};
