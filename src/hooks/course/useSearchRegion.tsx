import { useCoreQuery } from '../customQuery';

import { searchRegion } from '@/api/course/course';

export function useSearchRegion({ keyword }: { keyword: string }, options?: { enabled?: boolean }) {
    return useCoreQuery(['searchRegion', keyword], () => searchRegion({ keyword }), {
        enabled: options?.enabled ?? true,
        staleTime: 1000 * 60 * 5,
    });
}
