import type { TCommonResponse } from '../common/common';

// 월별 데이트 장소 수 응답 타입
export type TMonthlyDatePlaceResponse = TCommonResponse<{ datePlaceLogList: IMonthlyDatePlaceLog[] }>;

export type TGetDateTimeStates = TCommonResponse<{
    averageDateCount: number;
    myDateCount: number;
}>;
// 월별 데이트 장소 로그 타입
export interface IMonthlyDatePlaceLog {
    year: number;
    month: number;
    count: number;
}

// 연도별 통계로 변환된 타입
export interface IYearlyPlaceStates {
    year: number;
    placeCount: number;
}
