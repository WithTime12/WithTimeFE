import type { TCommonResponse } from '@/types/common/common';

export type TFaqItem = {
    faqId: number;
    title: string;
    content: string;
};

export type TFetchFaqsResponse = TCommonResponse<{
    faqList: TFaqItem[];
    totalPages: number;
    currentPage: number;
    currentSize: number;
    hasNextPage: boolean;
}>;

export type TFaqCategory = 'USAGE' | 'ALGORITHM' | 'FEATURE' | 'SCHEDULE' | 'ERROR' | 'ACCOUNT';
