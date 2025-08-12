import type { TFetchNoticeDetailResponse, TFetchNoticesResponse, TRequestGetNoticeRequest } from '@/types/notice/notice';

import { axiosInstance } from '../axiosInstance';

// 공지사항 전체 조회 API
export const fetchNotices = async ({ noticeCategory = 'SERVICE', page, size }: TRequestGetNoticeRequest): Promise<TFetchNoticesResponse> => {
    const { data } = await axiosInstance.get('/api/v1/notices', {
        params: { noticeCategory: noticeCategory, page, size },
    });
    return data;
};

// 공지사항 상세 조회 API
export const fetchNoticeDetail = async (noticeId: number): Promise<TFetchNoticeDetailResponse> => {
    const { data } = await axiosInstance.get(`/api/v1/notices/${noticeId}`);
    return data;
};
