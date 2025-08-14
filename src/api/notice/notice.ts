import type { TFetchNoticeDetailResponse, TFetchNoticesResponse } from '@/types/notice/notice';

import { axiosInstance } from '@/api/axiosInstance';

// 공지사항 전체 조회
export const getNotices = async (params: { category: 'SERVICE' | 'SYSTEM'; page: number; size: number }) => {
    const { data } = await axiosInstance.get<TFetchNoticesResponse>('/api/v1/notices', {
        params: {
            noticeCategory: params.category,
            page: params.page,
            size: params.size,
        },
    });
    return data;
};

// 상세 조회
export const getNoticeDetail = async (noticeId: number) => {
    const { data } = await axiosInstance.get<TFetchNoticeDetailResponse>(`/api/v1/notices/${noticeId}`);
    return data;
};

// 공지 검색
export const searchNotices = async (params: { keyword: string; page: number; size: number; category?: 'SERVICE' | 'SYSTEM' }) => {
    const { keyword, page, size, category } = params;

    const { data } = await axiosInstance.get<TFetchNoticesResponse>('/api/v1/notices/search', {
        params: {
            keyword,
            page,
            size,
            ...(category && { noticeCategory: category }),
        },
    });
    return data;
};
