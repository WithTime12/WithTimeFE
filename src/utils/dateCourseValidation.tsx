export const timeMap: Record<string, number> = {
    '1~2시간': 1.5,
    '3~4시간': 3.5,
    '반나절': 5.0,
    '하루종일': 8.0,
};
export const mealTimeRanges: Record<string, [string, string]> = {
    아침: ['05:00', '10:00'],
    점심: ['10:30', '14:00'],
    저녁: ['17:30', '20:30'],
};

const keywordGroups: Record<string, string[]> = {
    감성: ['감성적인', '감각적인', '잔잔한', '레트로 감성'],
    활동: ['산책 중심', '탐험 중심', '활발한 활동'],
    음식: ['이자카야/펍', '루프탑 카페', '브런치 카페', '디저트 카페'],
};

export const mealKeyword = ['양식', '한식', '중식', '이자카야/펍', '퓨전 음식점', '브런치 카페', '디저트 카페', '루프탑 카페'];

export function MealTimeValidation({ meal, time, totalTime }: { meal: string[]; time: string; totalTime: string }): string | null {
    if (!time || meal.length === 0 || !totalTime) return null;

    const toMinutes = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const timeStr = time.split(' ')[1]; // 'HH:mm'
    const current = toMinutes(timeStr);
    const duration = timeMap[totalTime];
    const end = current + duration * 60;

    // 식사 순서
    const priority = ['아침', '점심', '저녁'];
    const firstMeal = priority.find((m) => meal.includes(m));
    if (!firstMeal) return null;

    const [startStr, endStr] = mealTimeRanges[firstMeal];
    const mealStart = toMinutes(startStr);
    const mealEnd = toMinutes(endStr);

    const isWithinRange = (min: number, max: number, target: number) => target >= min && target <= max;

    if (isWithinRange(mealStart, mealEnd, current) || isWithinRange(mealStart, mealEnd, end)) {
        return null;
    }

    return `선택하신 시간(${timeStr} ~ ${Math.floor(end / 60)
        .toString()
        .padStart(2, '0')}:${(end % 60).toString().padStart(2, '0')})에는 ${firstMeal} 식사를 하기 어려워요. (가능 시간: ${startStr}~${endStr})`;
}
type TDateTimeStartValidationInput = {
    totalTime: string;
    time: string; // e.g. '2025-07-18 22:30'
};

export function DateTimeStartValidation({ totalTime, time }: TDateTimeStartValidationInput): string | null {
    if (!totalTime || !time) return null;

    const duration = timeMap[totalTime];
    if (duration == null) return null;

    const timeStr = time.split(' ')[1]; // 'HH:mm'
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
    if (totalTime === '1-2시간') {
        if (meal.length > 1) return `선택하신 시간에는 ${meal.length}가지 식사를 모두 포함하기 어려워요. 꼭 포함하고 싶은 식사만 선택해 주세요!`;
    } else if (totalTime === '3-4시간') {
        if (meal.length > 1) return `선택하신 시간에는 ${meal.length}가지 식사를 모두 포함하기 어려워요. 꼭 포함하고 싶은 식사만 선택해 주세요!`;
    } else if (totalTime === '반나절') {
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
            return `‘${groupName}’ 관련 키워드를 너무 많이 선택했어요! (${count}개 선택됨)`;
        }
    }
    return null;
}
// 유효성 검사 4
// 유효성 검사 8
// 유효성 검사 9
