export const timeMap: Record<string, number> = {
    ONETOTWO: 1.5,
    THREETOFOUR: 3.5,
    HALFDAY: 5.0,
    ALLDAY: 8.0,
};
export const mealTimeRanges: Record<string, [string, string]> = {
    BREAKFAST: ['05:00', '10:00'],
    LUNCH: ['10:30', '14:00'],
    DINNER: ['17:30', '20:30'],
};

export const mealTimeKorean: Record<string, string> = {
    BREAKFAST: '아침',
    LUNCH: '점심',
    DINNER: '저녁',
};

const keywordGroups: Record<string, string[]> = {
    감성: ['감성적인', '감각적인', '잔잔한', '레트로 감성'],
    활동: ['산책 중심', '탐험 중심', '활발한 활동'],
    음식: ['이자카야/펍', '루프탑 카페', '브런치 카페', '디저트 카페'],
};

export const mealKeyword = ['양식', '한식', '중식', '이자카야/펍', '퓨전 음식점', '브런치 카페', '디저트 카페', '루프탑 카페'];

export function MealTimeValidation({ meal, time, totalTime }: { meal: string[]; time: string; totalTime: string }): string | null {
    if (!time || meal.length === 0 || !totalTime) return null;
    const timeStr = time.split('T')[1]; // 'HH:mm'
    const toMinutes = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const start = toMinutes(timeStr); // 데이트 시작 시간
    const duration = timeMap[totalTime]; // 소요 시간(시간 단위)
    const end = start + duration * 60; // 종료 시간 (분)

    const isOverlapping = (start1: number, end1: number, start2: number, end2: number) => {
        if (start1 < start2) {
            // 데이트 시작시간이 식사 시작시간보다 빠를 경우
            if (end1 > start2) return true; // 데이트 끝나는 시간이 식사 시작시간보다 느려야함
            return false;
        } else if (start1 >= start2) {
            // 데이트 시작시간이 식사 시작시간 보다 느릴 경우
            if (start1 <= end2)
                // 데이트 시작 시간이 식사 마감시간보다 빠르면 됨
                return true;
            return false;
        }
    };

    // 선택한 식사 중 하나라도 겹치면 통과
    for (const m of meal) {
        const mealRange = mealTimeRanges[m];

        if (!mealRange) continue; // 존재하지 않으면 skip

        const [mealStartStr, mealEndStr] = mealRange;
        const mealStart = toMinutes(mealStartStr);
        const mealEnd = toMinutes(mealEndStr);
        if (isOverlapping(start, end, mealStart, mealEnd)) {
            return null;
        }
    }

    // 아무것도 안겹치면 첫 번째 식사를 기준으로 안내
    const first = meal[0];
    const [mealStartStr, mealEndStr] = mealTimeRanges[first];

    return `선택하신 시간에는 ${mealTimeKorean[first]} 식사를 하기 어려워요. (가능 시간: ${mealStartStr}~${mealEndStr})`;
}

type TDateTimeStartValidationInput = {
    totalTime: string;
    time: string; // e.g. '2025-07-18 22:30'
};

export function DateTimeStartValidation({ totalTime, time }: TDateTimeStartValidationInput): string | null {
    if (!totalTime || !time) return null;
    const duration = timeMap[totalTime];
    if (duration == null) return null;
    const timeStr = time.split('T')[1];

    const [startH, startM] = timeStr.split(':').map(Number);
    const startMinutes = startH * 60 + startM;

    const endMinutes = startMinutes + duration * 60;

    if (endMinutes > 1440) {
        // 24 * 60
        return `선택하신 시간에 데이트를 시작하면 자정을 넘겨요. 다른 시작 시간을 선택해 주세요.`;
    }

    return null;
}

export function TotalTimeMealValidation({ totalTime, meal }: { totalTime: string; meal: string[] | null }) {
    if (!meal) return null;
    if (totalTime === 'ONETOTWO') {
        if (meal.length > 1) return `선택하신 시간에는 ${meal.length}가지 식사를 모두 포함하기 어려워요. 꼭 포함하고 싶은 식사만 선택해 주세요!`;
    } else if (totalTime === 'THREETOFOUR') {
        if (meal.length > 1) return `선택하신 시간에는 ${meal.length}가지 식사를 모두 포함하기 어려워요. 꼭 포함하고 싶은 식사만 선택해 주세요!`;
    } else if (totalTime === 'HALFDAY') {
        if (meal.length > 2) return `선택하신 시간에는 ${meal.length}가지 식사를 모두 포함하기 어려워요. 꼭 포함하고 싶은 식사만 선택해 주세요!`;
    }
    return null;
}

export function KeywordMealValidation({ keywords, meal }: { keywords: string[]; meal: string[] | null }): string | null {
    if (!meal || meal.length === 0) {
        // keywords 중에 mealKeyword와 겹치는 항목이 있는지 확인
        const hasMealKeyword = keywords.some((k) => mealKeyword.includes(k));
        if (hasMealKeyword) {
            return '음식 관련 키워드를 선택하셨다면 식사도 꼭 선택해 주세요!';
        }
    }
    return null;
}

export function KeywordGroupOverValidation({ keywords }: { keywords: string[] }): string | null {
    for (const [groupName, groupKeywords] of Object.entries(keywordGroups)) {
        const count = keywords.filter((kw) => groupKeywords.includes(kw)).length;
        if (count >= 3) {
            return `‘${groupName}’ 관련 키워드를 너무 많이 선택했어요!`;
        }
    }
    return null;
}

export function BudgetTimeValidation({ budget, totalTime }: { budget: string; totalTime: string }): string | null {
    const warningTable: Record<string, string[]> = {
        THREETOFOUR: ['UNDER_10K'],
        HALFDAY: ['UNDER_10K', 'FROM_10K_TO_20K'],
        ALLDAY: ['UNDER_10K', 'FROM_10K_TO_20K', 'FROM_20K_TO_30K'],
    };

    const warnings = warningTable[totalTime];
    if (warnings && warnings.includes(budget)) {
        return '시간에 비해 예산이 낮아 추천이 제한될 수 있습니다.';
    }

    return null;
}
