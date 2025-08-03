import { useCoreQuery } from '../customQuery';

import { searchRegion } from '@/api/course/course';
import { regionKeys } from '@/queryKey/queryKey';

export function useSearchRegion({ keyword }: { keyword: string }, options?: { enabled?: boolean }) {
    return useCoreQuery(regionKeys.search(keyword).queryKey, () => searchRegion({ keyword }), {
        enabled: options?.enabled ?? true,
        staleTime: 1000 * 60 * 5,
    });
}
