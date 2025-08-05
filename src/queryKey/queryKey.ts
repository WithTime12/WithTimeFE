import { createQueryKeys } from '@lukemorales/query-key-factory';

export const regionKeys = createQueryKeys('region', {
    search: (keyword: string) => [keyword],
});

export const alarmKeys = createQueryKeys('alarm', {
    getAlarm: (size: number, cursor?: number) => [size, cursor],
});
