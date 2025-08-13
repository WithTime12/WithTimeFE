import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { UseQueryOptions } from '@tanstack/react-query';

export const regionKeys = createQueryKeys('region', {
    all: () =>
        ({
            queryKey: ['region'] as const,
        }) satisfies UseQueryOptions,
    search: (keyword: string) =>
        ({
            queryKey: ['region', 'search', keyword] as const,
        }) satisfies UseQueryOptions,
});

export const alarmKeys = createQueryKeys('alarm', {
    all: () =>
        ({
            queryKey: ['alarm'] as const,
        }) satisfies UseQueryOptions,
    getAlarm: (size: number, cursor?: number) =>
        ({
            queryKey: ['alarm', 'getAlarm', size, cursor] as const,
        }) satisfies UseQueryOptions,
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
