import type { TCommonResponse } from '../common/common';

// 공지사항 전체 조회
export type TNoticeItem = {
    noticeId: number;
    title: string;
    isPinned: boolean;
    createdAt: string;
};

export type TFetchNoticesResponse = TCommonResponse<{
    noticeList: TNoticeItem[];
    totalPages: number;
    currentPage: number;
    currentSize: number;
    hasNextPage: boolean;
}>;

// 공지사항 상세 조회
export type TNoticeDetail = {
    noticeId: number;
    title: string;
    content: string;
    isPinned: boolean;
    createdAt: string;
};

export type TFetchNoticeDetailResponse = TCommonResponse<TNoticeDetail | null>;
