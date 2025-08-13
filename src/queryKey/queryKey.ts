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
