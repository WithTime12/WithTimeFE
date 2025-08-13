import { createQueryKeys } from '@lukemorales/query-key-factory';

export const regionKeys = createQueryKeys('region', {
    all: null,
    search: (keyword: string) => ['search', keyword],
});

export const alarmKeys = createQueryKeys('alarm', {
    all: null,
    getAlarm: (size: number, cursor?: number) => ['getAlarm', size, cursor],
});

export const HomeKeys = createQueryKeys('home', {
    all: null,
    getUserGrade: () => ['user', 'grade'],
    dateCourseSave: () => ['date-courses', 'saved-count'],
    weather: (startDate, regionId) => ['weather', 'forecast', startDate, regionId],
    rainyInfo: (startDate, regionId) => ['rainy', 'forecast', startDate, regionId],
    keywords: () => ['keywords'],
    dateTimes: () => ['dateTimes'],
    monthlyPlaceStates: () => ['monthlyPlaceStates'],
    userRegion: () => ['user', 'region'],
});

export const NoticeKeys = createQueryKeys('notice', {
    all: null,
    getAllNotices: (page: number, size: number, noticeCategory: 'SERVICE' | 'SYSTEM') => [page, size, noticeCategory],
});
