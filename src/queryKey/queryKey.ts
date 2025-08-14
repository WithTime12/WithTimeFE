import { createQueryKeys } from '@lukemorales/query-key-factory';

export const regionKeys = createQueryKeys('region', {
    all: null,
    search: (keyword: string) => ['search', keyword],
});

export const alarmKeys = createQueryKeys('alarm', {
    all: null,
    getAlarm: (size: number, cursor?: number) => ['getAlarm', size, cursor],
    alarmSettings: () => ['alarmSettings'],
});

export const homeKeys = createQueryKeys('home', {
    all: null,
    getUserGrade: () => ['user', 'grade'],
    dateCourseSave: () => ['date-courses', 'saved-count'],
    weather: (startDate: string, regionId: number) => ['weather', 'forecast', startDate, regionId],
    rainyInfo: (startDate: string, regionId: number) => ['rainy', 'forecast', startDate, regionId],
    keywords: () => ['keywords'],
    dateTimes: () => ['dateTimes'],
    monthlyPlaceStates: () => ['monthlyPlaceStates'],
    userRegion: () => ['user', 'region'],
});

export const noticeKeys = createQueryKeys('notice', {
    all: null,
    getAllNotices: (page: number, size: number, noticeCategory: 'SERVICE' | 'SYSTEM') => [page, size, noticeCategory],
});
export const memberKeys = createQueryKeys('member', {
    all: null,
    memberInfo: () => ['memberInfo'],
    memberGrade: () => ['memberGrade'],
});
