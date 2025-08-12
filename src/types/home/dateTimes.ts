export interface IDateTimeResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        averageDateCount: number;
        myDateCount: number;
    };
}

export interface IDateTimeStats {
    averageDateCount: number;
    myDateCount: number;
}
