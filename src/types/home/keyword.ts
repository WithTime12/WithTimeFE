import type { TCommonResponse } from '../common/common';

// 이번 주 인기 키워드 응답 타입
export type TWeeklyKeywordResponse = TCommonResponse<{
    placeCategoryLogList: IPlaceCategoryLog[];
}>;

// 장소 카테고리 로그 타입
export interface IPlaceCategoryLog {
    placeCategoryLabel: string;
    count: number;
}
