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

// 데이트 횟수 통계 타입
export interface IDateTimesStats {
    totalPlaces: number;
    averageDateTimes: number;
    monthlyGrowth: number;
}
