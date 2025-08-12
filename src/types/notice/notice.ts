import type { TCommonResponse } from '../common/common';

// 공지 항목
export type TNoticeItem = {
    noticeId: number;
    title: string;
    isPinned: boolean;
    createdAt: string;
};

<<<<<<< HEAD
export type TRequestGetNoticeRequest = {
    size?: number;
    noticeCategory: 'SERVICE' | 'SYSTEM';
    page: number;
};

=======
// 공지사항 목록 조회
>>>>>>> f8aebe8 (fix: CodeRabbit 피드백 일부 수정)
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

// 공지 상세 조회 응답
export type TFetchNoticeDetailResponse = TCommonResponse<TNoticeDetail | null>;
