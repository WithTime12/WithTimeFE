import type { TCommonResponse } from '../common/common';

// 공지사항 전체 조회
export type TNoticeItem = {
    noticeId: number;
    title: string;
    isPinned: boolean;
    createdAt: string;
};

export type TRequestGetNoticeRequest = {
    size?: number;
    noticeCategory: 'SERVICE' | 'SYSTEM';
    page: number;
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

// 생성 요청
export type TCreateNoticePayload = {
    title: string;
    content: string;
    isPinned: boolean;
    noticeCategory: 'SERVICE' | 'SYSTEM';
};

// 수정 요청
export type TUpdateNoticePayload = {
    title: string;
    content: string;
    isPinned: boolean;
};

// 공통 응답 (이미 TCommonResponse가 있다면 생략 가능)
export type TNoticeCommonResponse = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
};
