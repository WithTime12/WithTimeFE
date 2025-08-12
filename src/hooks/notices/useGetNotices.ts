import { useInfiniteQuery } from '@tanstack/react-query';

import type { TRequestGetNoticeRequest } from '@/types/notice/notice';

import { fetchNotices } from '@/api/notice/notice';
import { NoticeKeys } from '@/queryKey/queryKey';

export const useGetNotices = ({ size, page, noticeCategory }: TRequestGetNoticeRequest) => {
    return useInfiniteQuery({
        queryKey: NoticeKeys.getAllNotices(page, size ?? 5, noticeCategory).queryKey,
        queryFn: ({ pageParam = page }) => fetchNotices({ page: pageParam, size: size ?? 5, noticeCategory }),
        initialPageParam: page,
        getNextPageParam: (lastPage) => (lastPage.result.hasNextPage ? lastPage.result.currentPage + 1 : undefined),
    });
};
