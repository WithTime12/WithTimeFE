import type { TCommonResponse } from '../common/common';

// 사용자 등급 응답 타입 (실제 API 응답 구조)
export type TUserGradeResponse = TCommonResponse<IGradeInfo>;

// 등급 정보 타입
export interface IGradeInfo {
    username: string;
    grade: string;
    level: string;
    description: string;
    nextRequiredPoint: number;
}
