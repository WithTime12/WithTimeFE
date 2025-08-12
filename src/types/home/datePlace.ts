// 월별 데이트 장소 수 응답 타입
export interface IMonthlyDatePlaceResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        datePlaceLogList: IMonthlyDatePlaceLog[];
    };
}

// 월별 데이트 장소 로그 타입
export interface IMonthlyDatePlaceLog {
    year: number;
    month: number;
    count: number;
}

// 연도별 통계로 변환된 타입
export interface IYearlyPlaceStats {
    year: number;
    placeCount: number;
}
