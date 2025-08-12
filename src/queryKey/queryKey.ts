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
    montlyPlaceStates: () => ['home', 'montlyPlaceStates'],
});

export const NoticeKeys = createQueryKeys('notice', {
    all: () => ['notice'],
    getAllNotices: (page, size, noticeCategory) => ['notice', page, size, noticeCategory],
});
