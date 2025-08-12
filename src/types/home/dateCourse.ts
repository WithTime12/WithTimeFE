// 사용자 등급 응답 타입 (실제 API 응답 구조)
export interface IDateCourseSavedCountResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        count: number;
    };
}
