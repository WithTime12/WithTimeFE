// 이번 주 인기 키워드 응답 타입
export interface IWeeklyKeywordResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        placeCategoryLogList: IPlaceCategoryLog[];
    };
}

// 장소 카테고리 로그 타입
export interface IPlaceCategoryLog {
    placeCategoryLabel: string;
    count: number;
}
