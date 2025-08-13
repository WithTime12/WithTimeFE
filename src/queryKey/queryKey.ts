import { createQueryKeys } from '@lukemorales/query-key-factory';

export const regionKeys = createQueryKeys('region', {
    search: (keyword: string) => [keyword],
});

export const alarmKeys = createQueryKeys('alarm', {
    getAlarm: (size: number, cursor?: number) => [size, cursor],
});

export const HomeKeys = createQueryKeys('home', {
    all: () => ['home'],
    getUserGrade: () => ['home', 'user', 'grade'],
    dateCourseSave: () => ['home', 'date-courses', 'saved-count'],
    weather: (startDate, regionId) => ['home', 'weather', 'forecast', startDate, regionId],
    rainyInfo: (startDate, regionId) => ['home', 'rainy', 'forecast', startDate, regionId],
    keywords: () => ['home', 'keywords'],
    dateTimes: () => ['home', 'dateTimes'],
    monthlyPlaceStates: () => ['home', 'monthlyPlaceStates'],
    userRegion: () => ['home', 'user', 'region'],
});

export const NoticeKeys = createQueryKeys('notice', {
    all: () => ['notice'],
    getAllNotices: (page: number, size: number, noticeCategory: 'SERVICE' | 'SYSTEM') => ['notice', page, size, noticeCategory],
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
