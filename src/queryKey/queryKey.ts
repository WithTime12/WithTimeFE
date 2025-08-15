import { createQueryKeys } from '@lukemorales/query-key-factory';

export const regionKeys = createQueryKeys('region', {
    search: (keyword: string) => ['search', keyword],
});

export const alarmKeys = createQueryKeys('alarm', {
    getAlarm: (size: number, cursor?: number) => ['getAlarm', size, cursor],
    alarmSettings: () => ['alarmSettings'],
});

export const homeKeys = createQueryKeys('home', {
    getUserGrade: () => ['user', 'grade'],
    dateCourseSave: () => ['date-courses', 'saved-count'],
    weather: (startDate: string, regionId: number) => ['weather', 'forecast', startDate, regionId],
    rainyInfo: (startDate: string, regionId: number) => ['rainy', 'forecast', startDate, regionId],
    keywords: null,
    dateTimes: null,
    monthlyPlaceStates: null,
    userRegion: () => ['user', 'region'],
});

export const noticeKeys = createQueryKeys('notice', {
    getAllNotices: (page: number, size: number, noticeCategory: 'SERVICE' | 'SYSTEM') => [page, size, noticeCategory],
});
export const memberKeys = createQueryKeys('member', {
    memberInfo: null,
    memberGrade: null,
    // memberKeys안에 있는 걸 모두 초기화 하고 싶으면 alarmKeys._def로 호출하면 됩니다!
});

export const dateCourseKeys = createQueryKeys('course', {
    all: null,
    getBookmarkedDateCourse: ({ budget, datePlaces, mealTypes, dateDurationTime, transportation, userPreferredKeywords, startTime, size, page }) => [
        'bookmark',
        budget,
        datePlaces,
        mealTypes,
        dateDurationTime,
        transportation,
        userPreferredKeywords,
        startTime,
        size,
        page,
    ],
    getDateCourse: ({ budget, datePlaces, mealTypes, dateDurationTime, transportation, userPreferredKeywords, startTime, size, page }) => [
        budget,
        datePlaces,
        mealTypes,
        dateDurationTime,
        transportation,
        userPreferredKeywords,
        startTime,
        size,
        page,
    ],
});
