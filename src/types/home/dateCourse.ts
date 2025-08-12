import type { TCommonResponse } from '../common/common';

// 사용자 등급 응답 타입 (실제 API 응답 구조)
export type TDateCourseSavedCountResponse = TCommonResponse<{
    count: number;
}>;
