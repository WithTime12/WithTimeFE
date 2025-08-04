import { createQueryKeys } from '@lukemorales/query-key-factory';

export const regionKeys = createQueryKeys('region', {
    search: (keyword: string) => [keyword],
});
